import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';
import { supabase } from '../lib/supabase';
import { AssetMap } from '../lib/assets';

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
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 'initial_2',
      sender: 'ai',
      text: 'Where are you travelling from?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
    numberOfPeople: 1,
    numberOfDays: 1,
  });

  const [isPlanning, setIsPlanning] = useState(false);
  const [planningText, setPlanningText] = useState('Planning your journey...');
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [planError, setPlanError] = useState<string | null>(null);

  // Auto-scroll to bottom on messages/plan changes
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);
  }, [messages, isPlanning, generatedPlan, planError]);

  const addAIMessage = (text: string, title?: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString() + '_ai',
      sender: 'ai',
      title: title,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const triggerTripPlanning = async (details: typeof tripDetails) => {
    if (isPlanning) return;
    setIsPlanning(true);
    setPlanningText('Planning your journey...');
    setPlanError(null);

    try {
      const { data, error } = await supabase.functions.invoke('trip-ai', {
        body: {
          fromLocation: details.fromLocation,
          toLocation: details.toLocation,
          budget: details.budget,
          currency: details.currency || 'INR',
          numberOfPeople: details.numberOfPeople,
          numberOfDays: details.numberOfDays,
        }
      });

      // Surface the actual error from the edge function for easier debugging
      const fnError = error?.message || (data && !data.success ? data.error : null);
      if (error || !data || !data.success || !data.plan) {
        throw new Error(fnError || "Failed to generate plan");
      }

      setGeneratedPlan(data.plan);
      addAIMessage(
        data.message || `I've crafted your complete ${details.numberOfDays}-day verified trip plan from ${details.fromLocation} to ${details.toLocation}! Here are your journey details.`,
        `🎉 Verified Trip Plan Ready`
      );
    } catch (err: any) {
      console.warn("Trip planning error:", err?.message || err);
      setPlanError("Sorry, I couldn't create your trip plan right now. Please try again.");
      addAIMessage(
        "Sorry, I couldn't create your trip plan right now. Please try again.",
        "⚠️ Planning Failed"
      );
    } finally {
      setIsPlanning(false);
    }
  };

  const triggerPlanModification = async (modificationText: string) => {
    if (isPlanning || !generatedPlan) return;
    setIsPlanning(true);
    setPlanningText(`Applying change: "${modificationText}"...`);
    setPlanError(null);

    try {
      const { data, error } = await supabase.functions.invoke('trip-ai', {
        body: {
          requirements: tripDetails,
          currentPlan: generatedPlan,
          modification: modificationText,
        }
      });

      if (error || !data || !data.success || !data.plan) {
        throw new Error(data?.error || "Failed to modify plan");
      }

      setGeneratedPlan(data.plan);
      if (data.requirements) {
        setTripDetails(prev => ({
          ...prev,
          budget: data.requirements.budget || prev.budget,
        }));
      }

      addAIMessage(
        data.message || `I've updated your trip plan based on your request: "${modificationText}".`,
        `✨ Plan Updated`
      );
    } catch (err: any) {
      console.warn("Plan modification error:", err);
      setPlanError("Sorry, I couldn't update your trip plan right now. Please try again.");
      addAIMessage(
        "Sorry, I couldn't adjust your trip plan with that request. Please try again.",
        "⚠️ Update Failed"
      );
    } finally {
      setIsPlanning(false);
    }
  };

  const processAnswer = (answer: string) => {
    setIsLoading(false);
    const cleanAnswer = answer.trim();

    // If plan is already generated, process as conversational modification
    if (currentStep === 'done' && generatedPlan) {
      triggerPlanModification(cleanAnswer);
      return;
    }

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
          if (cleanAnswer.toLowerCase().includes('inr') || cleanAnswer.includes('₹')) {
            currency = 'INR';
          } else if (cleanAnswer.toLowerCase().includes('usd') || cleanAnswer.includes('$')) {
            currency = 'USD';
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
          const finalTrip = { ...tripDetails, numberOfDays: days };
          setTripDetails(finalTrip);
          setCurrentStep('done');
          addAIMessage("Got all your requirements! Contacting verified travel sources to build your journey...", "✨ Planning Trip");
          triggerTripPlanning(finalTrip);
        }
        break;

      case 'done':
        triggerPlanModification(cleanAnswer);
        break;
    }
  };

  const handleSend = () => {
    if (isLoading || isSendingRef.current || isPlanning) return;
    const text = inputText.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    isSendingRef.current = true;
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      isSendingRef.current = false;
      processAnswer(text);
    }, 500);
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
              <Text style={styles.headerSubtitle}>Verified travel intelligence</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Feather name="clock" size={20} color="#0d1b2a" />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Chat Messages */}
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
            }
            return null;
          })}

          {/* Quick Chat Input Loader */}
          {isLoading && (
            <View style={styles.aiMessageContainer}>
              <View style={[styles.aiMessageBubble, { flexDirection: 'row', alignItems: 'center', gap: 8 }]}>
                <ActivityIndicator size="small" color="#2260FF" />
                <Text style={styles.aiMessageText}>Thinking...</Text>
              </View>
            </View>
          )}

          {/* Planning / Modifying Loader Card */}
          {isPlanning && (
            <View style={styles.planningCard}>
              <ActivityIndicator size="large" color="#2260FF" style={{ marginBottom: 12 }} />
              <Text style={styles.planningTitle}>{planningText}</Text>
              <Text style={styles.planningSubtitle}>
                Validating routes, checking database rates, and updating itinerary.
              </Text>
            </View>
          )}

          {/* Error Banner with Retry */}
          {planError && !isPlanning && (
            <View style={styles.errorCard}>
              <View style={styles.errorHeader}>
                <Ionicons name="alert-circle-outline" size={22} color="#EF4444" />
                <Text style={styles.errorTitle}>Planning Issue</Text>
              </View>
              <Text style={styles.errorDesc}>{planError}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                activeOpacity={0.8}
                onPress={() => triggerTripPlanning(tripDetails)}
              >
                <Ionicons name="refresh-outline" size={16} color="#ffffff" />
                <Text style={styles.retryButtonText}>Retry Planning</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ==================================================================== */}
          {/* ACTUAL GENERATED TRIP PLAN (Rendered strictly from Backend Response)  */}
          {/* ==================================================================== */}
          {generatedPlan && (
            <View style={styles.itineraryCardContainer}>
              {/* 1. Trip Summary Header */}
              <View style={styles.itineraryCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardHeaderLeft}>
                    <View style={styles.sparkleIconContainer}>
                      <Ionicons name="sparkles" size={18} color="#2260FF" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>
                        {generatedPlan.tripSummary.fromLocation} to {generatedPlan.tripSummary.toLocation}
                      </Text>
                      <Text style={styles.cardSubtitle}>
                        {generatedPlan.tripSummary.numberOfDays} Days • {generatedPlan.tripSummary.numberOfPeople} Traveler(s)
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Summary Pills */}
                <View style={styles.summaryPillsRow}>
                  <View style={styles.summaryPill}>
                    <Ionicons name="wallet-outline" size={14} color="#2260FF" />
                    <Text style={styles.summaryPillLabel}>Budget:</Text>
                    <Text style={styles.summaryPillValue}>
                      {generatedPlan.tripSummary.currency} {generatedPlan.tripSummary.budget.toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.summaryPill}>
                    <Ionicons name="calculator-outline" size={14} color="#10B981" />
                    <Text style={styles.summaryPillLabel}>Known Total:</Text>
                    <Text style={[styles.summaryPillValue, { color: '#10B981' }]}>
                      {generatedPlan.tripSummary.currency} {generatedPlan.budget.knownTotal.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 2. Transport Section */}
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Ionicons name="airplane-outline" size={18} color="#2260FF" />
                  <Text style={styles.sectionHeading}>Transport</Text>
                </View>
                {generatedPlan.transport?.selected ? (
                  <View style={styles.planCard}>
                    <View style={styles.planCardTop}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.planCardTitle}>
                          {generatedPlan.transport.provider ? `${generatedPlan.transport.provider} ` : ''}
                          {generatedPlan.transport.type?.toUpperCase()}
                        </Text>
                        <Text style={styles.planCardSub}>
                          {generatedPlan.tripSummary.fromLocation} → {generatedPlan.tripSummary.toLocation}
                        </Text>
                      </View>
                      <Text style={styles.planPrice}>
                        {generatedPlan.tripSummary.currency} {generatedPlan.transport.price?.toLocaleString()}
                      </Text>
                    </View>
                    {generatedPlan.transport.duration ? (
                      <Text style={styles.planMetaText}>
                        Duration: {generatedPlan.transport.duration}
                      </Text>
                    ) : null}
                  </View>
                ) : (
                  <View style={styles.emptyOptionCard}>
                    <Text style={styles.emptyOptionText}>Transport option not available in database</Text>
                  </View>
                )}
              </View>

              {/* 3. Hotel Section */}
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Ionicons name="business-outline" size={18} color="#8B5CF6" />
                  <Text style={styles.sectionHeading}>Accommodation</Text>
                </View>
                {generatedPlan.hotel?.selected ? (
                  <View style={styles.planCard}>
                    <View style={styles.planCardTop}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.planCardTitle}>{generatedPlan.hotel.name}</Text>
                        <Text style={styles.planCardSub}>{generatedPlan.hotel.location}</Text>
                      </View>
                      {generatedPlan.hotel.rating ? (
                        <View style={styles.ratingBadge}>
                          <Ionicons name="star" size={12} color="#F59E0B" />
                          <Text style={styles.ratingText}>{generatedPlan.hotel.rating}</Text>
                        </View>
                      ) : null}
                    </View>
                    <View style={styles.hotelPriceRow}>
                      <Text style={styles.hotelPerNight}>
                        {generatedPlan.tripSummary.currency} {generatedPlan.hotel.pricePerNight?.toLocaleString()} / night ({generatedPlan.hotel.numberOfNights} nights)
                      </Text>
                      <Text style={styles.planPrice}>
                        {generatedPlan.tripSummary.currency} {generatedPlan.hotel.totalPrice?.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.emptyOptionCard}>
                    <Text style={styles.emptyOptionText}>Suitable hotel not available in database</Text>
                  </View>
                )}
              </View>

              {/* 4. Vehicle Section (If Selected) */}
              {generatedPlan.vehicle?.selected ? (
                <View style={styles.sectionBlock}>
                  <View style={styles.sectionHeaderRow}>
                    <Ionicons name="car-outline" size={18} color="#F97316" />
                    <Text style={styles.sectionHeading}>Rental Vehicle</Text>
                  </View>
                  <View style={styles.planCard}>
                    <View style={styles.planCardTop}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.planCardTitle}>{generatedPlan.vehicle.name}</Text>
                        <Text style={styles.planCardSub}>{generatedPlan.vehicle.type}</Text>
                      </View>
                      <Text style={styles.planPrice}>
                        {generatedPlan.tripSummary.currency} {generatedPlan.vehicle.totalPrice?.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}

              {/* 5. Suggested Places (From Destinations table) */}
              {generatedPlan.suggestedPlaces && generatedPlan.suggestedPlaces.length > 0 ? (
                <View style={styles.sectionBlock}>
                  <View style={styles.sectionHeaderRow}>
                    <Ionicons name="location-outline" size={18} color="#10B981" />
                    <Text style={styles.sectionHeading}>Suggested Attractions</Text>
                  </View>
                  <View style={styles.suggestedList}>
                    {generatedPlan.suggestedPlaces.map((place: any, index: number) => (
                      <View key={index} style={styles.placeCard}>
                        <View style={styles.placeCardLeft}>
                          <View style={styles.placeNumberBadge}>
                            <Text style={styles.placeNumberText}>{index + 1}</Text>
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.placeTitle}>{place.title}</Text>
                            {place.reason ? (
                              <Text style={styles.placeReason}>{place.reason}</Text>
                            ) : null}
                            <View style={styles.placeMetaRow}>
                              {place.distance ? (
                                <Text style={styles.placeDistance}>{place.distance}</Text>
                              ) : null}
                              {place.rating ? (
                                <Text style={styles.placeRating}>★ {place.rating}</Text>
                              ) : null}
                              <Text style={styles.unverifiedTag}>Entry fee unverified</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              {/* 6. Day-by-Day Itinerary */}
              <View style={styles.sectionBlock}>
                <View style={styles.sectionHeaderRow}>
                  <Ionicons name="calendar-outline" size={18} color="#2260FF" />
                  <Text style={styles.sectionHeading}>Day-by-Day Itinerary</Text>
                </View>
                {generatedPlan.days?.map((dayObj: any, dIdx: number) => (
                  <View key={dIdx} style={styles.dayCard}>
                    <View style={styles.dayBadgeHeader}>
                      <Text style={styles.dayBadgeText}>Day {dayObj.day || dIdx + 1}</Text>
                    </View>
                    <View style={styles.activitiesContainer}>
                      {dayObj.activities && dayObj.activities.length > 0 ? (
                        dayObj.activities.map((act: any, aIdx: number) => (
                          <View key={aIdx} style={styles.activityRow}>
                            <View style={styles.activityDot} />
                            <View style={{ flex: 1 }}>
                              <Text style={styles.activityTitle}>{act.title}</Text>
                              {act.reason ? (
                                <Text style={styles.activityReason}>{act.reason}</Text>
                              ) : null}
                              {act.startTime || act.duration ? (
                                <Text style={styles.activityTime}>
                                  {act.startTime ? `${act.startTime} ` : ''}
                                  {act.duration ? `(${act.duration})` : ''}
                                </Text>
                              ) : null}
                            </View>
                          </View>
                        ))
                      ) : (
                        <Text style={styles.noActivitiesText}>Open exploration & leisure</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>

              {/* 7. Authoritative Server Budget Overview */}
              <View style={styles.budgetOverviewCard}>
                <Text style={styles.budgetCardHeading}>Server Budget Summary</Text>
                <View style={styles.budgetRow}>
                  <Text style={styles.budgetRowLabel}>Total Allocated Budget:</Text>
                  <Text style={styles.budgetRowVal}>
                    {generatedPlan.tripSummary.currency} {generatedPlan.tripSummary.budget.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.budgetRow}>
                  <Text style={styles.budgetRowLabel}>Verified Known Total:</Text>
                  <Text style={[styles.budgetRowVal, { color: '#10B981' }]}>
                    {generatedPlan.tripSummary.currency} {generatedPlan.budget.knownTotal.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.budgetRow}>
                  <Text style={styles.budgetRowLabel}>Remaining Known Buffer:</Text>
                  <Text style={[styles.budgetRowVal, { color: '#2260FF' }]}>
                    {generatedPlan.tripSummary.currency} {generatedPlan.budget.remainingKnownBudget.toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.budgetNotice}>
                  * Calculated strictly from verified database rates. Unverified meals or incidental activity fees are not included.
                </Text>
              </View>
            </View>
          )}

          {/* Contextual Suggestion Pills */}
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>
              {generatedPlan ? "Modify your trip plan with AI" : "You can also try asking"}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScroll}>
              {generatedPlan ? (
                <>
                  <SuggestionPill
                    icon="trending-down-outline"
                    iconColor="#10B981"
                    text="Make it cheaper"
                    onPress={() => triggerPlanModification("Make it cheaper")}
                  />
                  <SuggestionPill
                    icon="business-outline"
                    iconColor="#8B5CF6"
                    text="Change the hotel"
                    onPress={() => triggerPlanModification("Change the hotel")}
                  />
                  <SuggestionPill
                    icon="close-circle-outline"
                    iconColor="#EF4444"
                    text="I don't want a car"
                    onPress={() => triggerPlanModification("I don't want a car")}
                  />
                  <SuggestionPill
                    icon="leaf-outline"
                    iconColor="#0D9488"
                    text="Add more nature places"
                    onPress={() => triggerPlanModification("Add more nature places")}
                  />
                  <SuggestionPill
                    icon="heart-outline"
                    iconColor="#EC4899"
                    text="Give me a relaxed itinerary"
                    onPress={() => triggerPlanModification("Give me a relaxed itinerary")}
                  />
                </>
              ) : (
                <>
                  <SuggestionPill icon="image-outline" iconColor="#10B981" text="Best waterfalls near Manali" />
                  <SuggestionPill icon="business-outline" iconColor="#8B5CF6" text="Budget hotels in Goa" />
                  <SuggestionPill icon="restaurant-outline" iconColor="#F97316" text="Top cafes in Jaipur" />
                  <SuggestionPill icon="car-outline" iconColor="#3b82f6" text="How to reach Udaipur?" />
                </>
              )}
            </ScrollView>
          </View>

          <View style={{ height: 110 }} />
        </ScrollView>

        {/* Floating Input Area - Remains active for conversational modifications */}
        {isAIActive && (
          <View style={styles.inputContainerWrapper}>
            <View style={styles.inputContainer}>
              <View style={styles.inputSparkle}>
                <Ionicons name="sparkles" size={16} color="#2260FF" />
              </View>
              <TextInput
                style={styles.textInput}
                placeholder={
                  generatedPlan
                    ? "Ask to modify (e.g. 'make it cheaper', 'change hotel')..."
                    : currentStep === 'done'
                    ? "Trip requirements collected..."
                    : "Type your answer..."
                }
                placeholderTextColor="#9CA3AF"
                value={inputText}
                onChangeText={setInputText}
                onSubmitEditing={handleSend}
                editable={!isPlanning}
              />
              <TouchableOpacity style={styles.attachButton}>
                <Feather name="paperclip" size={20} color="#9CA3AF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sendButton, isPlanning && { opacity: 0.5 }]}
                onPress={handleSend}
                disabled={isPlanning}
              >
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

const SuggestionPill = ({ icon, iconColor, text, onPress }: any) => (
  <TouchableOpacity style={styles.suggestionPill} activeOpacity={0.7} onPress={onPress}>
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
    maxWidth: '85%',
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
    backgroundColor: '#3b66f5',
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
  // Planning Loading Card
  planningCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#2260FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  planningTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0d1b2a',
    marginBottom: 6,
  },
  planningSubtitle: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
  // Error Banner
  errorCard: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#991B1B',
  },
  errorDesc: {
    fontSize: 12,
    color: '#B91C1C',
    lineHeight: 18,
    marginBottom: 12,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    gap: 6,
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  // Itinerary Container & Card
  itineraryCardContainer: {
    marginTop: 8,
    marginBottom: 24,
    gap: 16,
  },
  itineraryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  sparkleIconContainer: {
    backgroundColor: '#EDF5FF',
    padding: 8,
    borderRadius: 12,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d1b2a',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  summaryPillsRow: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  summaryPill: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 10,
  },
  summaryPillLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
  },
  summaryPillValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0d1b2a',
    marginTop: 2,
  },
  // Sections
  sectionBlock: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d1b2a',
  },
  planCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
  },
  planCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0d1b2a',
  },
  planCardSub: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  planPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  planMetaText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 6,
  },
  emptyOptionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  emptyOptionText: {
    fontSize: 12,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  hotelPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
  },
  hotelPerNight: {
    fontSize: 11,
    color: '#64748b',
  },
  // Suggested Places List
  suggestedList: {
    gap: 8,
  },
  placeCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 10,
  },
  placeCardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  placeNumberBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E8FBF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeNumberText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  placeTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0d1b2a',
  },
  placeReason: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  placeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  placeDistance: {
    fontSize: 10,
    color: '#2260FF',
    fontWeight: '500',
  },
  placeRating: {
    fontSize: 10,
    color: '#D97706',
    fontWeight: '600',
  },
  unverifiedTag: {
    fontSize: 9,
    color: '#94a3b8',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  // Day by Day
  dayCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  dayBadgeHeader: {
    backgroundColor: '#EDF5FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  dayBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2260FF',
  },
  activitiesContainer: {
    gap: 10,
    paddingLeft: 4,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
    marginTop: 6,
  },
  activityTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0d1b2a',
  },
  activityReason: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },
  activityTime: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },
  noActivitiesText: {
    fontSize: 11,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  // Authoritative Budget Overview
  budgetOverviewCard: {
    backgroundColor: '#0d1b2a',
    borderRadius: 16,
    padding: 16,
  },
  budgetCardHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  budgetRowLabel: {
    fontSize: 11,
    color: '#94a3b8',
  },
  budgetRowVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  budgetNotice: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 8,
    fontStyle: 'italic',
    lineHeight: 14,
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
    bottom: 90,
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
