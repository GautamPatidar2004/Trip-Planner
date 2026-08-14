import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';

export const NatureEscapes = ({ onNavigate }: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate?.('LocalSpots')}>
          <Feather name="chevron-left" size={24} color="#0B1B3D" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="leaf" size={18} color="#10B981" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Nature Escapes Nearby</Text>
            <Text style={styles.headerSubtitle}>Breathe in nature, close to you</Text>
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
            {['Waterfalls', 'Mountains', 'Lakes', 'Forests', 'Valleys'].map((tab) => (
              <TouchableOpacity key={tab} style={styles.inactiveTab}>
                <Text style={styles.inactiveTabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={16} color="#2260FF" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Current Location Banner */}
        <View style={styles.locationBanner}>
          <View style={styles.locationBannerLeft}>
            <MaterialCommunityIcons name="crosshairs-gps" size={20} color="#10B981" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.locationBannerLabel}>Showing places near</Text>
              <Text style={styles.locationBannerValue}>Connaught Place, New Delhi</Text>
              <TouchableOpacity style={styles.changeLocationBtn}>
                <Text style={styles.changeLocationText}>Change Location</Text>
                <Feather name="chevron-right" size={14} color="#10B981" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Abstract graphic representation using a solid green/landscape image could go here */}
          <Image 
            source={require('../../assets/trip_kashmir.png')} 
            style={styles.locationBannerGraphic} 
          />
        </View>

        {/* List of Cards */}
        <View style={styles.listContainer}>
          
          <EscapeCard 
            title="Sahastradhara Falls"
            location="Dehradun, Uttarakhand"
            desc="A spectacular waterfall known for its healing sulphur springs."
            distance="46 km"
            rating="4.6"
            reviews="1.2k"
            category="Waterfall"
            categoryIcon="water"
            tags={[
              { text: 'Waterfall', color: '#EEF2FF', textColor: '#2260FF' },
              { text: 'Nature', color: '#ECFDF5', textColor: '#10B981' }
            ]}
            image={require('../../assets/season_manali.png')}
          />

          <EscapeCard 
            title="Bhimtal Lake"
            location="Bhimtal, Uttarakhand"
            desc="A serene lake surrounded by hills and lush greenery."
            distance="78 km"
            rating="4.7"
            reviews="980"
            category="Lake"
            categoryIcon="water-outline"
            tags={[
              { text: 'Lake', color: '#EEF2FF', textColor: '#2260FF' },
              { text: 'Relaxation', color: '#ECFDF5', textColor: '#10B981' }
            ]}
            image={require('../../assets/trip_kashmir.png')}
          />

          <EscapeCard 
            title="Kempty Falls Trek"
            location="Mussoorie, Uttarakhand"
            desc="A refreshing trek leading to one of the most popular waterfalls."
            distance="35 km"
            rating="4.5"
            reviews="860"
            category="Mountain"
            categoryIcon="triangle-outline"
            tags={[
              { text: 'Trek', color: '#EEF2FF', textColor: '#8B5CF6' },
              { text: 'Adventure', color: '#ECFDF5', textColor: '#10B981' }
            ]}
            image={require('../../assets/season_darjeeling.png')}
          />

          <EscapeCard 
            title="Dhanaulti Eco Park"
            location="Dhanaulti, Uttarakhand"
            desc="A peaceful eco park with dense deodar forests and trails."
            distance="62 km"
            rating="4.4"
            reviews="660"
            category="Forest"
            categoryIcon="leaf-outline"
            tags={[
              { text: 'Forest', color: '#ECFDF5', textColor: '#10B981' },
              { text: 'Peaceful', color: '#ECFDF5', textColor: '#10B981' }
            ]}
            image={require('../../assets/trip_kerala.png')}
          />
          
          <EscapeCard 
            title="Tunganath Valley"
            location="Chopta, Uttarakhand"
            desc="Breathtaking views of the Himalayas and pristine green meadows."
            distance="92 km"
            rating="4.7"
            reviews="1.1k"
            category="Valley"
            categoryIcon="image-outline"
            tags={[
              { text: 'Valley', color: '#EEF2FF', textColor: '#2260FF' },
              { text: 'Scenic', color: '#ECFDF5', textColor: '#10B981' }
            ]}
            image={require('../../assets/season_udaipur.png')}
          />

        </View>

        {/* Bottom Banner */}
        <View style={styles.bottomBanner}>
          <View style={styles.bottomBannerLeft}>
            <Ionicons name="map-outline" size={24} color="#065F46" />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.bottomBannerTitle}>Explore more offbeat destinations</Text>
              <Text style={styles.bottomBannerDesc}>Find hidden gems and peaceful getaways</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.exploreNowBtn} onPress={() => onNavigate?.('ExploreMap')}>
            <Text style={styles.exploreNowText}>Explore Now</Text>
            <Feather name="chevron-right" size={12} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Local Spots" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const EscapeCard = ({ title, location, desc, distance, rating, reviews, category, categoryIcon, tags, image }: any) => {
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
          <Ionicons name="navigate-outline" size={14} color="#2260FF" />
        </TouchableOpacity>
      </View>

      {/* Right Content Section */}
      <View style={styles.cardContent}>
        
        <View style={styles.cardHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={12} color="#2260FF" />
              <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.bookmarkBtn}>
            <Ionicons name="bookmark-outline" size={20} color="#2260FF" />
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
    backgroundColor: '#ECFDF5',
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
    backgroundColor: '#2260FF',
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
    borderColor: '#E2E8F0',
    marginLeft: 8,
    gap: 4,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  locationBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    overflow: 'hidden',
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
    marginBottom: 8,
  },
  changeLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeLocationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
  locationBannerGraphic: {
    position: 'absolute',
    right: -20,
    bottom: -10,
    width: 150,
    height: 100,
    opacity: 0.6,
    resizeMode: 'cover',
    borderRadius: 16,
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
    height: 140, // fixed height based on visual
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
    color: '#2260FF',
    flex: 1,
  },
  bookmarkBtn: {
    padding: 4,
  },
  descText: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginVertical: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
    flex: 1,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
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
  bottomBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5', // A soft green to match the design
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  bottomBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bottomBannerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#064E3B',
    marginBottom: 2,
  },
  bottomBannerDesc: {
    fontSize: 10,
    color: '#065F46',
  },
  exploreNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
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
