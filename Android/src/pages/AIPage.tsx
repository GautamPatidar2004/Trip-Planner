import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';
import { supabase } from '../lib/supabase';
export const AIPage = ({ session, onNavigate }: any) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [isAIActive, setIsAIActive] = useState(true);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'initial_1',
      sender: 'ai',
      title: '👋 Hi Explorer!',
      text: 'Hi, I am here for you to plan a new journey.',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    },
    {
      id: 'initial_2',
      sender: 'ai',
      text: 'Where are you travelling from?',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const isSendingRef = useRef(false);

  const [currentStep, setCurrentStep] = useState<'fromLocation' | 'toLocation' | 'budget' | 'numberOfPeople' | 'numberOfDays' | 'done'>('fromLocation');
  const [tripDetails, setTripDetails] = useState({
    fromLocation: '',
    toLocation: '',
    budget: 0,
    currency: 'INR',
    numberOfPeople: 0,
    numberOfDays: 0
  });

  // Scroll to bottom when a new message is added
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const addAIMessage = (text: string, title?: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString() + '_ai',
      sender: 'ai',
      title: title,
      text: text,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }]);
  };

  const processAnswer = (answer: string) => {
    setIsLoading(false);
    const cleanAnswer = answer.trim();

    switch (currentStep) {
      case 'fromLocation':
        if (!cleanAnswer) {
          addAIMessage("Please enter a valid starting location. Where are you travelling from?");
        } else {
          setTripDetails(prev => ({ ...prev, fromLocation: cleanAnswer }));
          setCurrentStep('toLocation');
          addAIMessage("Where do you want to go?");
        }
        break;
      
      case 'toLocation':
        if (!cleanAnswer) {
          addAIMessage("Please enter a valid destination. Where do you want to go?");
        } else {
          setTripDetails(prev => ({ ...prev, toLocation: cleanAnswer }));
          setCurrentStep('budget');
          addAIMessage("What is your total budget?");
        }
        break;

      case 'budget':
        if (!cleanAnswer) {
          addAIMessage("Please enter your total budget. What is your total budget?");
          break;
        }
        let budgetVal = cleanAnswer.replace(/[^0-9.kK]/g, '');
        let num = 0;
        if (budgetVal.toLowerCase().includes('k')) {
          num = parseFloat(budgetVal.toLowerCase().replace('k', '')) * 1000;
        } else {
          num = parseFloat(budgetVal);
        }
        
        if (isNaN(num) || num <= 0) {
          addAIMessage("Please enter a valid positive number for your budget (e.g., 15000 or 15k). What is your total budget?");
        } else {
          let currency = 'INR';
          const symbolMatch = cleanAnswer.match(/^([^0-9\s]+)/);
          if (symbolMatch && symbolMatch[1]) {
            currency = symbolMatch[1];
          } else if (cleanAnswer.toLowerCase().includes('inr') || cleanAnswer.includes('₹')) {
            currency = '₹';
          } else if (cleanAnswer.toLowerCase().includes('usd') || cleanAnswer.includes('$')) {
            currency = '$';
          }
          setTripDetails(prev => ({ ...prev, budget: num, currency: currency }));
          setCurrentStep('numberOfPeople');
          addAIMessage("How many people are travelling?");
        }
        break;

      case 'numberOfPeople':
        if (!cleanAnswer) {
          addAIMessage("Please enter the number of people. How many people are travelling?");
          break;
        }
        let people = parseInt(cleanAnswer.replace(/[^0-9]/g, ''), 10);
        if (isNaN(people) || people <= 0) {
          addAIMessage("Please enter a valid number of people. How many people are travelling?");
        } else {
          setTripDetails(prev => ({ ...prev, numberOfPeople: people }));
          setCurrentStep('numberOfDays');
          addAIMessage("How many days do you want to travel?");
        }
        break;

      case 'numberOfDays':
        if (!cleanAnswer) {
          addAIMessage("Please enter the number of days. How many days do you want to travel?");
          break;
        }
        let days = parseInt(cleanAnswer.replace(/[^0-9]/g, ''), 10);
        if (isNaN(days) || days <= 0) {
          addAIMessage("Please enter a valid number of days. How many days do you want to travel?");
        } else {
          setTripDetails(prev => ({ ...prev, numberOfDays: days }));
          setCurrentStep('done');
          addAIMessage("Great! I have all the basic details. Let me plan your journey.");
        }
        break;
        
      case 'done':
        addAIMessage("Great! I have all the basic details. Let me plan your journey.");
        break;
    }
  };

  const handleSend = () => {
    if (isLoading || isSendingRef.current) return;
    const text = inputText.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    isSendingRef.current = true;
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      isSendingRef.current = false;
      processAnswer(text);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate?.('Dashboard')}>
          <Feather name="chevron-left" size={24} color="#0d1b2a" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.avatarContainer}>
            <View style={styles.robotAvatar}>
              <MaterialCommunityIcons name="robot" size={22} color="#2260FF" />
            </View>
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Trip Planner AI</Text>
            <Text style={styles.headerSubtitle}>Your smart travel companion</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Feather name="clock" size={20} color="#0d1b2a" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        
        {messages.map((msg: any) => {
          if (msg.sender === 'ai') {
            return (
              <View key={msg.id} style={styles.aiMessageContainer}>
                <View style={styles.aiMessageBubble}>
                  {msg.title ? (
                    <Text style={styles.aiMessageTitle}>{msg.title}</Text>
                  ) : null}
                  <Text style={styles.aiMessageText}>{msg.text}</Text>
                </View>
                {msg.timestamp && <Text style={styles.timestampLeft}>{msg.timestamp}</Text>}
              </View>
            );
          } else if (msg.sender === 'user') {
            return (
              <View key={msg.id} style={styles.userMessageContainer}>
                <View style={styles.userMessageBubble}>
                  <Text style={styles.userMessageText}>{msg.text}</Text>
                </View>
                <View style={styles.timestampRightContainer}>
                  {msg.timestamp && <Text style={styles.timestampRight}>{msg.timestamp}</Text>}
                  <Ionicons name="checkmark-done" size={14} color="#3b82f6" />
                </View>
              </View>
            );
          } else {
            return null;
          }
        })}

        {isLoading && (
          <View style={styles.aiMessageContainer}>
            <View style={[styles.aiMessageBubble, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
              <ActivityIndicator size="small" color="#2260FF" />
              <Text style={styles.aiMessageText}>Thinking...</Text>
            </View>
          </View>
        )}

        {/* Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>You can also try asking</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
            <SuggestionPill icon="image-outline" iconColor="#10B981" text="Best waterfalls near Manali" />
            <SuggestionPill icon="business-outline" iconColor="#8B5CF6" text="Budget hotels in Manali" />
            <SuggestionPill icon="restaurant-outline" iconColor="#F97316" text="Top cafes in Old Manali" />
            <SuggestionPill icon="car-outline" iconColor="#3b82f6" text="How to reach Manali?" />
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Input Area */}
      {isAIActive && (
        <View style={styles.inputContainerWrapper}>
          <View style={styles.inputContainer}>
            <View style={styles.inputSparkle}>
              <Ionicons name="sparkles" size={16} color="#2260FF" />
            </View>
            <TextInput 
              style={styles.textInput}
              placeholder="Ask anything about your trip..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity style={styles.attachButton}>
              <Feather name="paperclip" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Feather name="arrow-right" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <BottomNav activeTab="Trip Planner AI" onNavigate={onNavigate} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const ItineraryItem = ({ day, title, desc, image, icon }: any) => (
  <View style={styles.itineraryItem}>
    <Image source={image} style={styles.itineraryImage} />
    <View style={styles.itineraryDetails}>
      <View style={styles.itineraryDayBadge}>
        <Text style={styles.itineraryDayText}>{day}</Text>
      </View>
      <Text style={styles.itineraryTitle}>{title}</Text>
      <Text style={styles.itineraryDesc}>{desc}</Text>
    </View>
    <View style={styles.itineraryActionIcon}>
      <Ionicons name={icon} size={18} color="#2260FF" />
    </View>
  </View>
);

const SuggestionPill = ({ icon, iconColor, text }: any) => (
  <TouchableOpacity style={styles.suggestionPill} activeOpacity={0.7}>
    <Ionicons name={icon} size={16} color={iconColor} />
    <Text style={styles.suggestionText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  robotAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDF5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FAFAFA',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0d1b2a',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748b',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  // AI Message
  aiMessageContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  aiMessageBubble: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  aiMessageTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d1b2a',
    marginBottom: 8,
  },
  aiMessageText: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 20,
  },
  timestampLeft: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 6,
    marginLeft: 4,
  },
  // User Message
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  userMessageBubble: {
    backgroundColor: '#3b66f5', // Blue color matching design
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    maxWidth: '85%',
  },
  userMessageText: {
    fontSize: 13,
    color: '#ffffff',
    lineHeight: 20,
  },
  timestampRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginRight: 4,
    gap: 4,
  },
  timestampRight: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  // AI Itinerary Card
  itineraryCardContainer: {
    marginBottom: 24,
  },
  itineraryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    paddingRight: 16,
  },
  sparkleIconContainer: {
    backgroundColor: '#EDF5FF',
    padding: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d1b2a',
    flex: 1,
    lineHeight: 20,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 20,
  },
  itineraryList: {
    gap: 16,
    marginBottom: 20,
  },
  itineraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itineraryImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  itineraryDetails: {
    flex: 1,
  },
  itineraryDayBadge: {
    backgroundColor: '#EDF5FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  itineraryDayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2260FF',
  },
  itineraryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0d1b2a',
    marginBottom: 2,
  },
  itineraryDesc: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 16,
  },
  itineraryActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  footerBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIconGreen: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8FBF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  footerLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  footerValueGreen: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  footerDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 12,
  },
  footerIconOrange: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF3E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  footerValueOrange: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F97316',
  },
  // Suggestions
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0d1b2a',
    marginBottom: 12,
  },
  suggestionsScroll: {
    gap: 12,
    paddingRight: 16,
  },
  suggestionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#4b5563',
  },
  // Input Area
  inputContainerWrapper: {
    position: 'absolute',
    bottom: 90, // Above bottom nav
    left: 16,
    right: 16,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  inputSparkle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#191c1e',
    height: 40,
  },
  attachButton: {
    padding: 8,
    marginRight: 4,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2260FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
