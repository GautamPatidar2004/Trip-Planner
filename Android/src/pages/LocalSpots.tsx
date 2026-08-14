import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { HeaderLogo } from '../components/HeaderLogo';
import { BottomNav } from '../components/BottomNav';

export const LocalSpots = ({ session, onNavigate }: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <HeaderLogo title="Local Spots" />
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={require('../../assets/profile_user.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search for places, vibes or activities..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
            <Ionicons name="options-outline" size={22} color="#191c1e" />
          </TouchableOpacity>
        </View>

        {/* Nature Escapes Nearby */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="leaf-outline" size={20} color="#10B981" />
              <View>
                <Text style={styles.sectionTitle}>Nature Escapes Nearby</Text>
                <Text style={styles.sectionSubtitle}>Breathe in. Slow down. Feel alive.</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => onNavigate?.('NatureEscapes')}>
              <Text style={styles.seeAllText}>Explore All {'>'}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <SpotCard 
              title="Hidden Falls" 
              subtitle="Waterfall • 12 km" 
              rating="4.7" 
              image={require('../../assets/season_manali.png')} 
            />
            <SpotCard 
              title="Greenwood Forest" 
              subtitle="Forest • 18 km" 
              rating="4.6" 
              image={require('../../assets/hotspot_garden.png')} 
            />
            <SpotCard 
              title="Serenity Lake" 
              subtitle="Lake • 22 km" 
              rating="4.8" 
              image={require('../../assets/trip_kashmir.png')} 
            />
          </ScrollView>
        </View>

        {/* Romantic Getaways */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="heart-outline" size={20} color="#ef4444" />
              <View>
                <Text style={styles.sectionTitle}>Romantic Getaways</Text>
                <Text style={styles.sectionSubtitle}>Perfect places for two hearts.</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => onNavigate?.('RomanticGetaways')}>
              <Text style={styles.seeAllText}>Explore All {'>'}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <SpotCard 
              title="Moonlight Cafe" 
              subtitle="Cafe • 8 km" 
              rating="4.7" 
              image={require('../../assets/hotspot_cafe.png')} 
            />
            <SpotCard 
              title="Hilltop Hideout" 
              subtitle="Lounge • 15 km" 
              rating="4.6" 
              image={require('../../assets/season_udaipur.png')} 
            />
            <SpotCard 
              title="Sunset Point" 
              subtitle="Viewpoint • 20 km" 
              rating="4.8" 
              image={require('../../assets/hotspot_sunset.png')} 
            />
          </ScrollView>
        </View>

        {/* Family Time Favorites */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="people-outline" size={20} color="#F97316" />
              <View>
                <Text style={styles.sectionTitle}>Family Time Favorites</Text>
                <Text style={styles.sectionSubtitle}>Fun, food and memories together.</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => onNavigate?.('FamilyFavorites')}>
              <Text style={styles.seeAllText}>Explore All {'>'}</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <SpotCard 
              title="Shiv Mandir" 
              subtitle="Temple • 6 km" 
              rating="4.8" 
              image={require('../../assets/season_jaipur.png')} 
            />
            <SpotCard 
              title="Riverfront Park" 
              subtitle="Picnic Spot • 10 km" 
              rating="4.6" 
              image={require('../../assets/season_goa.png')} 
            />
            <SpotCard 
              title="The Garden Bistro" 
              subtitle="Restaurant • 9 km" 
              rating="4.7" 
              image={require('../../assets/hotspot_market.png')} 
            />
          </ScrollView>
        </View>

        {/* Bottom Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerIconContainer}>
            <Ionicons name="map" size={32} color="#2260FF" style={{ opacity: 0.8 }} />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Discover more around you</Text>
            <Text style={styles.bannerSubtitle}>New places, new vibes – every day.</Text>
          </View>
          <TouchableOpacity style={styles.bannerButton} onPress={() => onNavigate?.('ExploreMap')}>
            <Text style={styles.bannerButtonText}>Explore Map {'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <BottomNav activeTab="Local Spots" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const SpotCard = ({ image, title, subtitle, rating }: any) => (
  <ImageBackground source={image} style={styles.spotCard} imageStyle={{ borderRadius: 16 }}>
    <View style={styles.cardOverlayGradient} />
    
    <View style={styles.cardTopRow}>
      <View style={styles.ratingBadge}>
        <FontAwesome name="star" size={10} color="#2260FF" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
      <TouchableOpacity style={styles.heartBadge}>
        <Ionicons name="heart-outline" size={14} color="#555" />
      </TouchableOpacity>
    </View>

    <View style={styles.cardBottomContent}>
      <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
      <View style={styles.subtitleRow}>
        <Ionicons name="location-outline" size={10} color="#e0e0e0" />
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </View>
  </ImageBackground>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#191c1e',
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionContainer: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d1b2a',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#64748b',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2260FF',
    marginTop: 2,
  },
  horizontalScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  // Spot Cards
  spotCard: {
    width: 150,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 12,
  },
  cardOverlayGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: '60%', // Simulates a bottom gradient for readability
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#191c1e',
  },
  heartBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBottomContent: {
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardSubtitle: {
    fontSize: 10,
    color: '#e0e0e0',
  },
  // Banner
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  bannerIconContainer: {
    marginRight: 16,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0d1b2a',
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 10,
    color: '#64748b',
  },
  bannerButton: {
    backgroundColor: '#4060F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  bannerButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
});
