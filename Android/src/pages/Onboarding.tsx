import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, SafeAreaView } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export const Onboarding = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              styles.dot,
              step === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderScreen0 = () => (
    <ImageBackground
      source={require('../../assets/profile_bg.png')}
      style={styles.fullScreenBg}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <SafeAreaView style={styles.screen0Top}>
        <View style={styles.screen0LogoContainer}>
          <Image source={require('../../assets/app_logo_icon.png')} style={styles.screen0Logo} />
        </View>
        <Text style={styles.screen0Title}>AI Trip Planner</Text>
        <Text style={styles.screen0Subtitle}>Plan smarter. Travel better.</Text>
      </SafeAreaView>

      <View style={styles.screen0BottomCard}>
        <Text style={styles.mainTitle}>
          <Text style={styles.textDark}>Your Journey,</Text>{'\n'}
          <Text style={styles.textBlue}>Perfectly Planned</Text>
        </Text>
        <Text style={styles.mainDesc}>
          Let AI handle the details while you focus on making memories.
        </Text>
        {renderDots()}
        <TouchableOpacity style={styles.wideButton} onPress={handleNext}>
          <Text style={styles.wideButtonText}>Next</Text>
          <Feather name="arrow-right" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  const renderScreen1 = () => (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar style="dark" />
      <View style={styles.headerTitles}>
        <Text style={styles.mainTitle}>
          <Text style={styles.textDark}>Discover Amazing</Text>{'\n'}
          <Text style={styles.textBlue}>Places Nearby</Text>
        </Text>
        <Text style={styles.mainDesc}>
          Find hidden gems, popular spots and local favorites around you.
        </Text>
      </View>

      <View style={styles.mockupContainer}>
        {/* Fake Map Background */}
        <View style={styles.fakeMap}>
          <View style={styles.mapLine} />
          <View style={[styles.mapLine, styles.mapLine2]} />
          <View style={[styles.mapLine, styles.mapLine3]} />
          <View style={[styles.mapPin, { top: '25%', right: '25%' }]}>
            <Ionicons name="location" size={24} color="#0B1B3D" />
          </View>
          <View style={[styles.mapPin, { top: '50%', left: '30%' }]}>
            <Ionicons name="location" size={24} color="#0B1B3D" />
          </View>
          <View style={[styles.mapPin, { bottom: '25%', right: '35%' }]}>
            <Ionicons name="location" size={24} color="#0B1B3D" />
          </View>
          
          <View style={styles.mapCurrentLocation}>
            <View style={styles.mapCurrentLocationInner} />
          </View>
        </View>

        {/* Floating Cards */}
        <View style={[styles.floatingCard, { top: 40, left: 10 }]}>
          <Image source={require('../../assets/season_manali.png')} style={styles.floatingImage} />
          <Text style={styles.floatingTitle}>Waterfall View</Text>
          <Text style={styles.floatingSubtitle}>8 km away</Text>
        </View>

        <View style={[styles.floatingCard, { top: '40%', right: -10 }]}>
          <Image source={require('../../assets/hotspot_sunset.png')} style={styles.floatingImage} />
          <Text style={styles.floatingTitle}>Sunset Point</Text>
          <Text style={styles.floatingSubtitle}>5 km away</Text>
        </View>

        <View style={[styles.floatingCard, { bottom: 60, left: -10 }]}>
          <Image source={require('../../assets/hotspot_cafe.png')} style={styles.floatingImage} />
          <Text style={styles.floatingTitle}>The Willow Cafe</Text>
          <Text style={styles.floatingSubtitle}>3 km away</Text>
        </View>
      </View>

      <View style={styles.bottomNavRow}>
        <TouchableOpacity onPress={onFinish}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        {renderDots()}
        <TouchableOpacity style={styles.iconNextButton} onPress={handleNext}>
          <Feather name="arrow-right" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderScreen2 = () => (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar style="dark" />
      <View style={styles.headerTitles}>
        <Text style={styles.mainTitle}>
          <Text style={styles.textDark}>AI-Powered</Text>{'\n'}
          <Text style={styles.textBlue}>Trip Planning</Text>
        </Text>
        <Text style={styles.mainDesc}>
          Tell us your preferences and let our AI craft the perfect itinerary for you.
        </Text>
      </View>

      <View style={styles.mockupContainerFull}>
        <View style={styles.fakePhone}>
          
          <View style={styles.chatPrompt}>
            <Text style={styles.chatPromptLabel}>Where do you want to go?</Text>
            <View style={styles.chatPromptInput}>
              <Text style={styles.chatPromptText}>Manali for 4 days</Text>
            </View>
          </View>

          <View style={styles.robotContainer}>
            <Ionicons name="sparkles" size={20} color="#bfdbfe" style={{ position: 'absolute', left: 20, top: 40 }} />
            <Ionicons name="sparkles" size={24} color="#0B1B3D" style={{ position: 'absolute', right: 30, top: 20 }} />
            <MaterialCommunityIcons name="robot" size={100} color="#3b82f6" />
          </View>

          <View style={styles.optionsList}>
            <View style={styles.optionItem}>
              <View style={[styles.optionIcon, { backgroundColor: '#EDF5FF' }]}>
                <Ionicons name="airplane-outline" size={20} color="#2260FF" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Best Transport</Text>
                <Text style={styles.optionSubtitle}>Flights, Trains & more</Text>
              </View>
            </View>
            <View style={styles.optionItem}>
              <View style={[styles.optionIcon, { backgroundColor: '#F3E8FF' }]}>
                <Ionicons name="business-outline" size={20} color="#8B5CF6" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Top Hotels</Text>
                <Text style={styles.optionSubtitle}>Handpicked for you</Text>
              </View>
            </View>
            <View style={styles.optionItem}>
              <View style={[styles.optionIcon, { backgroundColor: '#E8FBF4' }]}>
                <Ionicons name="location-outline" size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Local Experiences</Text>
                <Text style={styles.optionSubtitle}>Spots & activities</Text>
              </View>
            </View>
            <View style={styles.optionItem}>
              <View style={[styles.optionIcon, { backgroundColor: '#FFF3E8' }]}>
                <Ionicons name="restaurant-outline" size={20} color="#F97316" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Food & Dining</Text>
                <Text style={styles.optionSubtitle}>Local tastes & must-try</Text>
              </View>
            </View>
          </View>

        </View>
      </View>

      <View style={styles.bottomNavRow}>
        <TouchableOpacity onPress={onFinish}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        {renderDots()}
        <TouchableOpacity style={styles.iconNextButton} onPress={handleNext}>
          <Feather name="arrow-right" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const renderScreen3 = () => (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar style="dark" />
      <View style={styles.headerTitles}>
        <Text style={styles.mainTitle}>
          <Text style={styles.textDark}>All Your Trips,</Text>{'\n'}
          <Text style={styles.textBlue}>One Place</Text>
        </Text>
        <Text style={styles.mainDesc}>
          Manage your trips, bookings, tickets and memories in one place.
        </Text>
      </View>

      <View style={styles.mockupContainerFull}>
        <View style={styles.fakePhone}>
          
          <Text style={styles.phoneHeader}>My Trips</Text>
          
          <Text style={styles.phoneSectionTitle}>Upcoming Trip</Text>
          <View style={styles.phoneCardRow}>
            <Image source={require('../../assets/trip_kashmir.png')} style={styles.phoneCardImageSquare} />
            <View style={{ flex: 1 }}>
              <Text style={styles.phoneCardTitle}>Kashmir Paradise</Text>
              <Text style={styles.phoneCardSubtitle}>26 May - 30 May, 2025</Text>
              <View style={styles.phoneBadgeGreen}>
                <Text style={styles.phoneBadgeTextGreen}>In 10 days</Text>
              </View>
            </View>
          </View>

          <Text style={styles.phoneSectionTitle}>Bookings</Text>
          <View style={styles.phoneIconRow}>
            <View style={styles.phoneIconBox}>
              <Ionicons name="airplane-outline" size={24} color="#2260FF" />
              <Text style={styles.phoneIconBoxTitle}>Flight</Text>
              <Text style={styles.phoneIconBoxStatus}>Confirmed</Text>
            </View>
            <View style={styles.phoneIconBox}>
              <Ionicons name="business-outline" size={24} color="#10B981" />
              <Text style={styles.phoneIconBoxTitle}>Hotel</Text>
              <Text style={styles.phoneIconBoxStatus}>Confirmed</Text>
            </View>
            <View style={styles.phoneIconBox}>
              <Ionicons name="train-outline" size={24} color="#0B1B3D" />
              <Text style={styles.phoneIconBoxTitle}>Train</Text>
              <Text style={styles.phoneIconBoxStatus}>Confirmed</Text>
            </View>
          </View>

          <Text style={styles.phoneSectionTitle}>Recent Activity</Text>
          <View style={styles.phoneCardRow}>
            <Image source={require('../../assets/season_udaipur.png')} style={styles.phoneCardImageSquareSmall} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.phoneCardTitle}>Trip to Manali</Text>
                <View style={styles.phoneBadgeGreenOutline}>
                  <Text style={styles.phoneBadgeTextGreenOutline}>Completed</Text>
                </View>
              </View>
              <Text style={styles.phoneCardSubtitle}>Completed</Text>
              <Text style={styles.phoneCardSubtitle}>10 - 14 Apr, 2025</Text>
            </View>
          </View>

        </View>
      </View>

      <View style={styles.bottomNavRow}>
        <TouchableOpacity onPress={onFinish}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        {renderDots()}
        <TouchableOpacity style={styles.getStartedButton} onPress={onFinish}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <View style={styles.wrapper}>
      {step === 0 && renderScreen0()}
      {step === 1 && renderScreen1()}
      {step === 2 && renderScreen2()}
      {step === 3 && renderScreen3()}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 40,
  },
  // Screen 0
  fullScreenBg: {
    flex: 1,
    justifyContent: 'space-between',
  },
  screen0Top: {
    alignItems: 'center',
    paddingTop: 60,
  },
  screen0LogoContainer: {
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  screen0Logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  screen0Title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 4,
  },
  screen0Subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  screen0BottomCard: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
    alignItems: 'center',
  },
  wideButton: {
    flexDirection: 'row',
    backgroundColor: '#2260FF',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  wideButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  // Shared Header
  headerTitles: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 12,
  },
  textDark: {
    color: '#0B1B3D',
  },
  textBlue: {
    color: '#2260FF',
  },
  mainDesc: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  // Dots
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#2260FF',
  },
  inactiveDot: {
    backgroundColor: '#cbd5e1',
  },
  // Shared Bottom Row
  bottomNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingBottom: 40,
    paddingTop: 16,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  iconNextButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2260FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2260FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedButton: {
    backgroundColor: '#2260FF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#2260FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  // Screen 1: Discover
  mockupContainer: {
    flex: 1,
    marginHorizontal: 32,
    marginBottom: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  fakeMap: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#E5E7EB',
  },
  mapLine: {
    position: 'absolute',
    width: '150%',
    height: 20,
    backgroundColor: '#D1D5DB',
    transform: [{ rotate: '45deg' }],
    top: '30%',
    left: '-20%',
  },
  mapLine2: {
    backgroundColor: '#BFDBFE',
    top: '50%',
    width: '100%',
    transform: [{ rotate: '-30deg' }],
  },
  mapLine3: {
    backgroundColor: '#D1D5DB',
    height: 10,
    top: '70%',
    transform: [{ rotate: '15deg' }],
  },
  mapPin: {
    position: 'absolute',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  mapCurrentLocation: {
    position: 'absolute',
    top: '48%',
    left: '45%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(34,96,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCurrentLocationInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2260FF',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  floatingCard: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 8,
    width: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  floatingImage: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  floatingTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B1B3D',
  },
  floatingSubtitle: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  // Screen 2 & 3: Mockup Containers
  mockupContainerFull: {
    flex: 1,
    marginHorizontal: 32,
    marginBottom: 20,
    position: 'relative',
  },
  fakePhone: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 32,
    borderWidth: 8,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    overflow: 'hidden',
    padding: 16,
  },
  // Screen 2 details
  chatPrompt: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
    width: '90%',
  },
  chatPromptLabel: {
    fontSize: 10,
    color: '#0B1B3D',
    fontWeight: '700',
    marginBottom: 6,
  },
  chatPromptInput: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  chatPromptText: {
    fontSize: 11,
    color: '#0B1B3D',
  },
  robotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    marginBottom: 10,
    position: 'relative',
  },
  optionsList: {
    gap: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B1B3D',
  },
  optionSubtitle: {
    fontSize: 10,
    color: '#64748B',
  },
  // Screen 3 details
  phoneHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 12,
  },
  phoneSectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0B1B3D',
    marginBottom: 8,
    marginTop: 8,
  },
  phoneCardRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  phoneCardImageSquare: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  phoneCardImageSquareSmall: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  phoneCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B1B3D',
    marginBottom: 2,
  },
  phoneCardSubtitle: {
    fontSize: 9,
    color: '#64748B',
    marginBottom: 4,
  },
  phoneBadgeGreen: {
    backgroundColor: '#E8FBF4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  phoneBadgeTextGreen: {
    fontSize: 8,
    fontWeight: '700',
    color: '#10B981',
  },
  phoneBadgeGreenOutline: {
    backgroundColor: '#E8FBF4',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  phoneBadgeTextGreenOutline: {
    fontSize: 8,
    fontWeight: '600',
    color: '#10B981',
  },
  phoneIconRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  phoneIconBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  phoneIconBoxTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0B1B3D',
    marginTop: 4,
    marginBottom: 2,
  },
  phoneIconBoxStatus: {
    fontSize: 8,
    color: '#10B981',
    fontWeight: '500',
  },
});
