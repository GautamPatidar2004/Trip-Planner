import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';

export const AIPage = ({ session, onNavigate }: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* AI Message */}
        <View style={styles.aiMessageContainer}>
          <View style={styles.aiMessageBubble}>
            <Text style={styles.aiMessageTitle}>👋 Hi Explorer!</Text>
            <Text style={styles.aiMessageText}>
              I'm here to help you plan the perfect trip. Where shall we go today?
            </Text>
          </View>
          <Text style={styles.timestampLeft}>9:30 AM</Text>
        </View>

        {/* User Message */}
        <View style={styles.userMessageContainer}>
          <View style={styles.userMessageBubble}>
            <Text style={styles.userMessageText}>
              Plan a 3 day trip to Manali for couple with a budget of ₹15,000 including stay and sightseeing.
            </Text>
          </View>
          <View style={styles.timestampRightContainer}>
            <Text style={styles.timestampRight}>9:31 AM</Text>
            <Ionicons name="checkmark-done" size={14} color="#3b82f6" />
          </View>
        </View>

        {/* AI Itinerary Card */}
        <View style={styles.itineraryCardContainer}>
          <View style={styles.itineraryCard}>
            
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <View style={styles.sparkleIconContainer}>
                  <Ionicons name="sparkles" size={16} color="#2260FF" />
                </View>
                <Text style={styles.cardTitle}>Here's your 3 day trip plan for Manali 🏔️</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="bookmark-outline" size={20} color="#2260FF" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.cardSubtitle}>
              A perfect blend of adventure, romance and relaxation within your budget of ₹15,000.
            </Text>

            <View style={styles.itineraryList}>
              <ItineraryItem 
                day="Day 1" 
                title="Arrival & Local Sightseeing" 
                desc="Mall Road, Hadimba Temple, Old Manali\nEvening at riverside cafes" 
                image={require('../../assets/season_manali.png')} 
                icon="map-outline"
              />
              <ItineraryItem 
                day="Day 2" 
                title="Solang Valley Adventure" 
                desc="Solang Valley, ATV ride, Ropeway\nVisit to Vashisht Hot Springs" 
                image={require('../../assets/trip_kashmir.png')} 
                icon="snow-outline"
              />
              <ItineraryItem 
                day="Day 3" 
                title="Scenic Views & Departure" 
                desc="Visit Jogini Waterfall, Tibetan Monastery\nShopping & Departure" 
                image={require('../../assets/season_udaipur.png')} 
                icon="airplane-outline"
              />
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.footerBlock}>
                <View style={styles.footerIconGreen}>
                  <Ionicons name="shield-checkmark-outline" size={16} color="#10B981" />
                </View>
                <View>
                  <Text style={styles.footerLabel}>Estimated Budget</Text>
                  <Text style={styles.footerValueGreen}>₹14,500</Text>
                </View>
              </View>
              
              <View style={styles.footerDivider} />
              
              <View style={styles.footerBlock}>
                <View style={styles.footerIconOrange}>
                  <Ionicons name="star-outline" size={16} color="#F97316" />
                </View>
                <View>
                  <Text style={styles.footerLabel}>Best Time to Visit</Text>
                  <Text style={styles.footerValueOrange}>Mar - Jun, Sep - Feb</Text>
                </View>
              </View>
            </View>

          </View>
          <Text style={styles.timestampLeft}>9:32 AM</Text>
        </View>

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
      <View style={styles.inputContainerWrapper}>
        <View style={styles.inputContainer}>
          <View style={styles.inputSparkle}>
            <Ionicons name="sparkles" size={16} color="#2260FF" />
          </View>
          <TextInput 
            style={styles.textInput}
            placeholder="Ask anything about your trip..."
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.attachButton}>
            <Feather name="paperclip" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton}>
            <Feather name="arrow-right" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      <BottomNav activeTab="Trip Planner AI" onNavigate={onNavigate} />
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
