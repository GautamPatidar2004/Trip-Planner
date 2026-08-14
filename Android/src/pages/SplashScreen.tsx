import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export const SplashScreen = () => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 100,
      duration: 3000,
      useNativeDriver: false, // width animation doesn't support native driver
    }).start();
  }, [progressAnim]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });
  return (
    <ImageBackground 
      source={require('../../assets/profile_bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      
      {/* Top Section */}
      <SafeAreaView style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/app_logo_icon.png')} 
            style={styles.logoImage} 
          />
        </View>
        <Text style={styles.title}>AI Trip Planner</Text>
        <Text style={styles.subtitle}>Plan Smart. Travel Better.</Text>
        
        <View style={styles.decorativeLineContainer}>
          <View style={styles.line} />
          <Ionicons name="sparkles" size={16} color="#0B1B3D" style={styles.sparkleIcon} />
          <View style={styles.line} />
        </View>
      </SafeAreaView>

      {/* Bottom Section */}
      <SafeAreaView style={styles.bottomSection}>
        <View style={styles.featuresRow}>
          
          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
              <Ionicons name="airplane" size={24} color="#60A5FA" />
            </View>
            <Text style={styles.featureText}>Smart Planning</Text>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
              <Ionicons name="bed" size={24} color="#60A5FA" />
            </View>
            <Text style={styles.featureText}>Best Stays</Text>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
              <Ionicons name="location" size={24} color="#60A5FA" />
            </View>
            <Text style={styles.featureText}>Local Experiences</Text>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.featureItem}>
            <View style={styles.iconBox}>
              <Ionicons name="ticket" size={24} color="#60A5FA" />
            </View>
            <Text style={styles.featureText}>Seamless Travel</Text>
          </View>

        </View>

        <Text style={styles.loadingText}>Your next adventure is loading...</Text>
        
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBarFill, { width: widthInterpolated }]} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  topSection: {
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 24,
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
    marginBottom: 20,
  },
  decorativeLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#0B1B3D',
    opacity: 0.2,
  },
  sparkleIcon: {
    marginHorizontal: 12,
    opacity: 0.5,
  },
  // Bottom Section
  bottomSection: {
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)', // Subtle gradient/darkening could also work here
    paddingTop: 40,
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '500',
    textAlign: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  progressBarContainer: {
    width: 200,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
});
