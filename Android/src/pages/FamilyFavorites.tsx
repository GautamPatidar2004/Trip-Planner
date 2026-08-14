import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomNav } from '../components/BottomNav';

export const FamilyFavorites = ({ onNavigate }: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate?.('LocalSpots')}>
          <Feather name="chevron-left" size={24} color="#0B1B3D" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="people" size={18} color="#0D9488" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Family Time Favourites</Text>
            <Text style={styles.headerSubtitle}>Perfect places for quality time with family</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Feather name="search" size={20} color="#0B1B3D" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterTabs}>
            <TouchableOpacity style={styles.activeTab}>
              <Text style={styles.activeTabText}>All</Text>
            </TouchableOpacity>
            {['Parks & Gardens', 'Fun & Adventure', 'Museums', 'Zoos & Aquariums'].map((tab) => (
              <TouchableOpacity key={tab} style={styles.inactiveTab}>
                <Text style={styles.inactiveTabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={16} color="#0D9488" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Current Location Banner */}
        <View style={styles.locationBannerWrapper}>
          <LinearGradient
            colors={['#E6FFFA', '#CCFBF1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.locationBanner}
          >
            <View style={styles.locationBannerLeft}>
              <MaterialCommunityIcons name="crosshairs-gps" size={20} color="#0D9488" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.locationBannerLabel}>Showing family friendly places near</Text>
                <Text style={styles.locationBannerValue}>Connaught Place, New Delhi</Text>
                <Text style={styles.locationBannerDesc}>Fun, learning and memories – all in one place!</Text>
                <TouchableOpacity style={styles.changeLocationBtn}>
                  <Text style={styles.changeLocationText}>Change Location</Text>
                  <Feather name="chevron-right" size={14} color="#0D9488" />
                </TouchableOpacity>
              </View>
            </View>
            
            <Image 
              source={require('../../assets/trip_kerala.png')} 
              style={styles.locationBannerGraphic} 
            />
          </LinearGradient>
        </View>

        {/* List of Cards */}
        <View style={styles.listContainer}>
          
          <FamilyCard 
            title="National Zoological Park"
            location="Mathura Road, New Delhi"
            desc="Explore amazing wildlife and learn about nature with your family."
            distance="6.2 km"
            rating="4.6"
            reviews="1.3k"
            category="Zoo"
            categoryIcon="paw"
            tags={[
              { text: 'Animals', color: '#ECFDF5', textColor: '#059669' },
              { text: 'Outdoor', color: '#EFF6FF', textColor: '#2563EB' },
              { text: 'Family', color: '#F3E8FF', textColor: '#7C3AED' }
            ]}
            image={require('../../assets/trip_kashmir.png')}
          />

          <FamilyCard 
            title="Adventure Island"
            location="Rohini, New Delhi"
            desc="Thrilling rides and water fun for the whole family."
            distance="15.4 km"
            rating="4.5"
            reviews="980"
            category="Amusement Park"
            categoryIcon="ticket"
            tags={[
              { text: 'Fun', color: '#EFF6FF', textColor: '#2563EB' },
              { text: 'Adventure', color: '#FFF7ED', textColor: '#EA580C' },
              { text: 'Family', color: '#F3E8FF', textColor: '#7C3AED' }
            ]}
            image={require('../../assets/season_goa.png')}
          />

          <FamilyCard 
            title="National Science Centre"
            location="Pragati Maidan, New Delhi"
            desc="Interactive exhibits that make learning fun for kids and adults."
            distance="4.8 km"
            rating="4.4"
            reviews="760"
            category="Museum"
            categoryIcon="business"
            tags={[
              { text: 'Learning', color: '#EFF6FF', textColor: '#2563EB' },
              { text: 'Indoor', color: '#FFF7ED', textColor: '#EA580C' },
              { text: 'Family', color: '#F3E8FF', textColor: '#7C3AED' }
            ]}
            image={require('../../assets/season_udaipur.png')}
          />

          <FamilyCard 
            title="Lodhi Garden"
            location="Lodhi Road, New Delhi"
            desc="Beautiful garden perfect for picnics, morning walks and playtime."
            distance="3.1 km"
            rating="4.6"
            reviews="1.1k"
            category="Garden"
            categoryIcon="leaf"
            tags={[
              { text: 'Nature', color: '#ECFDF5', textColor: '#059669' },
              { text: 'Picnic', color: '#FEF2F2', textColor: '#DC2626' },
              { text: 'Family', color: '#F3E8FF', textColor: '#7C3AED' }
            ]}
            image={require('../../assets/hotspot_garden.png')}
          />
          
          <FamilyCard 
            title="Delhi Aquarium"
            location="Bahar Gate, New Delhi"
            desc="Discover the magical underwater world with your little explorers."
            distance="5.7 km"
            rating="4.3"
            reviews="540"
            category="Aquarium"
            categoryIcon="water"
            tags={[
              { text: 'Aquatic', color: '#EFF6FF', textColor: '#2563EB' },
              { text: 'Indoor', color: '#FFF7ED', textColor: '#EA580C' },
              { text: 'Family', color: '#F3E8FF', textColor: '#7C3AED' }
            ]}
            image={require('../../assets/trip_kerala.png')}
          />

        </View>

        {/* Bottom Banner */}
        <View style={styles.bottomBannerWrapper}>
          <LinearGradient
            colors={['#E6FFFA', '#F0FDFA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bottomBanner}
          >
            <View style={styles.bottomBannerLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="people" size={24} color="#0D9488" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.bottomBannerTitle}>Make it a perfect family day out!</Text>
                <Text style={styles.bottomBannerDesc}>Get AI suggested itineraries and plan smarter.</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.exploreNowBtn}>
              <Ionicons name="sparkles-outline" size={12} color="#ffffff" />
              <Text style={styles.exploreNowText}>Plan with AI</Text>
              <Feather name="chevron-right" size={14} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Local Spots" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const FamilyCard = ({ title, location, desc, distance, rating, reviews, category, categoryIcon, tags, image }: any) => {
  return (
    <View style={styles.card}>
      {/* Left Image Section */}
      <View style={styles.cardImageContainer}>
        <Image source={image} style={styles.cardImage} />
        
        {/* Category Badge on top left of image */}
        <View style={styles.imageCategoryBadge}>
          <Ionicons name={categoryIcon} size={10} color="#ffffff" />
          <Text style={styles.imageCategoryText}>{category}</Text>
        </View>

        {/* Navigation Icon on bottom left of image */}
        <TouchableOpacity style={styles.imageNavBadge}>
          <Ionicons name="navigate-outline" size={14} color="#0D9488" />
        </TouchableOpacity>
      </View>

      {/* Right Content Section */}
      <View style={styles.cardContent}>
        
        <View style={styles.cardHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={12} color="#0D9488" />
              <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.bookmarkBtn}>
            <Ionicons name="bookmark-outline" size={20} color="#0D9488" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.descText} numberOfLines={2}>{desc}</Text>

        <View style={styles.cardFooter}>
          {/* Tags */}
          <View style={styles.tagsContainer}>
            {tags.map((tag: any, idx: number) => (
              <View key={idx} style={[styles.tag, { backgroundColor: tag.color }]}>
                <Text style={[styles.tagText, { color: tag.textColor }]}>{tag.text}</Text>
              </View>
            ))}
          </View>
          
          {/* Stats Column */}
          <View style={styles.statsContainer}>
            <View style={styles.distanceBadge}>
              <Ionicons name="location-outline" size={12} color="#059669" />
              <Text style={styles.distanceText}>{distance}</Text>
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingScore}>{rating}</Text>
              <Text style={styles.ratingCount}>({reviews})</Text>
            </View>
          </View>
        </View>

      </View>
    </View>
  );
};

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
    width: 44,
    height: 44,
    borderRadius: 22,
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
  headerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6FFFA', // Light teal
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0B1B3D',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  filterScroll: {
    flex: 1,
  },
  filterTabs: {
    paddingRight: 16,
    gap: 8,
    flexDirection: 'row',
  },
  activeTab: {
    backgroundColor: '#0D9488', // Teal
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  inactiveTab: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  inactiveTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    marginLeft: 8,
    gap: 4,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D9488',
  },
  locationBannerWrapper: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  locationBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'relative',
  },
  locationBannerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 2,
    width: '60%',
  },
  locationBannerLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
  },
  locationBannerValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 4,
  },
  locationBannerDesc: {
    fontSize: 11,
    color: '#475569',
    marginBottom: 10,
    lineHeight: 16,
  },
  changeLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeLocationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
  locationBannerGraphic: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0,
    width: 160,
    height: '100%',
    opacity: 0.8,
    resizeMode: 'cover',
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 16,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    height: 145, 
  },
  cardImageContainer: {
    width: 110,
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageCategoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  imageCategoryText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#ffffff',
  },
  imageNavBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 11,
    color: '#0D9488',
    flex: 1,
  },
  bookmarkBtn: {
    padding: 4,
  },
  descText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginVertical: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 4,
    flex: 1,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '600',
  },
  statsContainer: {
    alignItems: 'flex-end',
    gap: 6,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
  },
  distanceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingScore: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0B1B3D',
  },
  ratingCount: {
    fontSize: 10,
    color: '#94A3B8',
  },
  bottomBannerWrapper: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bottomBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  bottomBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bottomBannerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 2,
  },
  bottomBannerDesc: {
    fontSize: 10,
    color: '#64748B',
  },
  exploreNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D9488',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  exploreNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
});
