import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { HeaderLogo } from '../components/HeaderLogo';
import { BottomNav } from '../components/BottomNav';
import { PlanTripModal } from '../components/PlanTripModal';
import { supabase } from '../lib/supabase';
import { AssetMap } from '../lib/assets';

export const Dashboard = ({ session, onNavigate }: any) => {
  const [isPlanModalVisible, setPlanModalVisible] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('app-data', {
          body: { target: 'dashboard' }
        });
        if (!error && data?.success) {
          setDashboardData(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <HeaderLogo />
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={require('../../assets/profile_user.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <ImageBackground
          source={require('../../assets/hero_beach.png')}
          style={styles.heroCard}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.heroOverlay}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Your next adventure{'\n'}awaits ✨</Text>
              <Text style={styles.heroSubtitle}>Plan smart. Travel better.</Text>
            </View>
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.8} onPress={() => setPlanModalVisible(true)}>
              <Ionicons name="sparkles-outline" size={16} color="#ffffff" />
              <Text style={styles.heroButtonText}>Plan New Trip</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Upcoming Holidays */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Feather name="calendar" size={18} color="#005ab5" />
              <Text style={styles.sectionTitle}>Upcoming Holidays</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigate?.('Holidays')}>
              <Text style={styles.seeAllText}>View All {'>'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {dashboardData?.upcomingHolidays?.map((item: any, i: number) => (
              <HolidayCard key={i} {...item} />
            ))}
          </ScrollView>
        </View>

        {/* Hotspots Near You */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Feather name="map-pin" size={18} color="#005ab5" />
              <Text style={styles.sectionTitle}>Hotspots Near You</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigate?.('Hotspots')}>
              <Text style={styles.seeAllText}>Explore All {'>'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {dashboardData?.hotspotsNearYou?.map((item: any, i: number) => (
              <HotspotCard key={i} image={AssetMap[item.imageKey]} icon={item.icon} title={item.title} distance={item.distance} rating={item.rating} />
            ))}
          </ScrollView>
        </View>

        {/* Popular Season Spots */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Feather name="map" size={18} color="#005ab5" />
              <Text style={styles.sectionTitle}>Popular Season Spots</Text>
            </View>
            <TouchableOpacity onPress={() => onNavigate?.('SeasonSpots')}>
              <Text style={styles.seeAllText}>See All {'>'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {dashboardData?.popularSeasonSpots?.map((item: any, i: number) => (
              <SeasonSpotCard key={i} image={AssetMap[item.imageKey]} title={item.title} subtitle={item.subtitle} rating={item.rating} />
            ))}
          </ScrollView>
        </View>

        {/* Tips for Travelers */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Feather name="zap" size={18} color="#005ab5" />
              <Text style={styles.sectionTitle}>Tips for Travelers</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All {'>'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {dashboardData?.tipsForTravelers?.map((item: any, i: number) => (
              <TipCard key={i} {...item} />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <PlanTripModal 
        visible={isPlanModalVisible} 
        onClose={() => setPlanModalVisible(false)} 
      />

      <BottomNav activeTab="Dashboard" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const HolidayCard = ({ dateNum, dateMonth, title, day, flag }: any) => (
  <View style={styles.holidayCard}>
    <View style={styles.holidayDateContainer}>
      <Text style={styles.holidayDateNum}>{dateNum}</Text>
      <Text style={styles.holidayDateMonth}>{dateMonth}</Text>
    </View>
    <View style={styles.holidayTextContainer}>
      <Text style={styles.holidayTitle} numberOfLines={2}>{title}</Text>
      <Text style={styles.holidayDay}>{day}</Text>
    </View>
    <View style={styles.flagContainer}>
      <Text style={styles.flagEmoji}>{flag}</Text>
    </View>
  </View>
);

const HotspotCard = ({ image, icon, title, distance, rating }: any) => (
  <ImageBackground source={image} style={styles.hotspotCard} imageStyle={{ borderRadius: 16 }}>
    <View style={styles.cardOverlayGradient} />
    <View style={styles.hotspotContent}>
      <View style={styles.hotspotIconBadge}>
        <Ionicons name={icon} size={14} color="#555" />
      </View>
      <View style={styles.cardBottomRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.cardSubtitle}>{distance}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <FontAwesome name="star" size={10} color="#2260FF" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
    </View>
  </ImageBackground>
);

const SeasonSpotCard = ({ image, title, subtitle, rating }: any) => (
  <ImageBackground source={image} style={styles.seasonCard} imageStyle={{ borderRadius: 16 }}>
    <View style={styles.cardOverlayGradient} />
    <View style={[styles.cardBottomRow, styles.seasonContent]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.ratingBadge}>
        <FontAwesome name="star" size={10} color="#2260FF" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    </View>
  </ImageBackground>
);

const TipCard = ({ icon, text, bgColor, iconColor }: any) => (
  <View style={[styles.tipCard, { backgroundColor: bgColor }]}>
    <Ionicons name={icon} size={22} color={iconColor} style={styles.tipIcon} />
    <Text style={styles.tipText}>{text}</Text>
  </View>
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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroCard: {
    height: 180,
    marginHorizontal: 24,
    marginTop: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  heroTextContainer: {
    marginBottom: 12,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4060F0',
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  heroButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionContainer: {
    marginTop: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191c1e',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2260FF',
  },
  horizontalScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  // Holiday Cards
  holidayCard: {
    width: 140,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  holidayDateContainer: {
    alignItems: 'center',
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingRight: 10,
  },
  holidayDateNum: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2260FF',
  },
  holidayDateMonth: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2260FF',
    marginTop: 2,
  },
  holidayTextContainer: {
    flex: 1,
  },
  holidayTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#191c1e',
    marginBottom: 2,
  },
  holidayDay: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  flagContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  flagEmoji: {
    fontSize: 10,
  },
  // Hotspot & Season Cards
  hotspotCard: {
    width: 150,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
  },
  seasonCard: {
    width: 120,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  cardOverlayGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '50%', // Simulates a bottom gradient
  },
  hotspotContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  hotspotIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#191c1e',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 10,
    color: '#e0e0e0',
    marginTop: 2,
  },
  seasonContent: {
    padding: 10,
    zIndex: 1,
  },
  // Tips Cards
  tipCard: {
    width: 130,
    height: 140,
    borderRadius: 12,
    padding: 16,
  },
  tipIcon: {
    marginBottom: 16,
  },
  tipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191c1e',
    lineHeight: 18,
  },
});
