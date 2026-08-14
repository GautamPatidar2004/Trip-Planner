import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';
import { supabase } from '../lib/supabase';
import { AssetMap } from '../lib/assets';

const { width } = Dimensions.get('window');

export const ExploreMap = ({ onNavigate }: any) => {
  const [exploreData, setExploreData] = useState<any>({ markers: [], places: [] });

  useEffect(() => {
    const fetchExploreData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('app-data', {
          body: { target: 'explore_map' }
        });
        if (!error && data?.success) {
          setExploreData(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch explore data", err);
      }
    };
    fetchExploreData();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate?.('LocalSpots')}>
          <Feather name="chevron-left" size={24} color="#0B1B3D" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="location" size={18} color="#2260FF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Explore Map</Text>
            <Text style={styles.headerSubtitle}>Discover amazing places near you</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Feather name="search" size={20} color="#0B1B3D" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterTabs}>
          <TouchableOpacity style={styles.activeTab}>
            <Ionicons name="grid-outline" size={14} color="#ffffff" />
            <Text style={styles.activeTabText}>All</Text>
          </TouchableOpacity>
          
          <FilterTab icon="leaf-outline" text="Nature" color="#10B981" />
          <FilterTab icon="triangle-outline" text="Adventure" color="#6366F1" />
          <FilterTab icon="people-outline" text="Family" color="#0D9488" />
          <FilterTab icon="heart-outline" text="Romantic" color="#EC4899" />
          
        </ScrollView>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={16} color="#2260FF" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Map and Bottom Sheet Container */}
      <View style={styles.mapContainer}>
        {/* Static Map Background (Placeholder) */}
        <Image 
          source={require('../../assets/trip_kashmir.png')} 
          style={styles.mapImagePlaceholder} 
          blurRadius={2} // Blur slightly to make markers pop like a real map
        />
        
        {/* Map Overlay Controls */}
        <View style={styles.mapControlsTopLeft}>
          <TouchableOpacity style={styles.listViewBtn}>
            <Ionicons name="list" size={16} color="#2260FF" />
            <Text style={styles.listViewText}>List View</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapControlsRight}>
          <TouchableOpacity style={styles.mapControlBtn}>
            <MaterialCommunityIcons name="crosshairs-gps" size={20} color="#64748B" />
            <Text style={styles.mapControlText}>Re-center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlBtn}>
            <Ionicons name="navigate" size={20} color="#2260FF" />
            <Text style={styles.mapControlTextBlue}>My Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapControlBtn}>
            <Ionicons name="layers-outline" size={20} color="#64748B" />
            <Text style={styles.mapControlText}>Layers</Text>
          </TouchableOpacity>
        </View>

        {/* Map Markers */}
        {exploreData?.markers?.map((marker: any, index: number) => (
          <View key={index} style={[styles.marker, { top: marker.lat, left: marker.lng }]}>
            <View style={[styles.markerIconBg, { backgroundColor: marker.bg_color || '#3B82F6' }]}>
              {marker.icon ? <Ionicons name={marker.icon as any} size={12} color="#ffffff" /> : null}
            </View>
            {marker.title && <Text style={styles.markerText}>{marker.title}</Text>}
            {marker.distance && <Text style={styles.markerSubText}>{marker.distance}</Text>}
          </View>
        ))}

        {/* Scrollable Bottom Sheet */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={styles.bottomSheetScroll}
          contentContainerStyle={styles.bottomSheetScrollContent}
        >
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Top Places Near You</Text>
              <TouchableOpacity style={styles.sortBtn}>
                <Text style={styles.sortText}>Sort by: Distance</Text>
                <Feather name="chevron-down" size={14} color="#2260FF" />
              </TouchableOpacity>
            </View>

            {/* Places List */}
            <View style={styles.listContainer}>
              {exploreData?.places?.map((place: any, i: number) => (
                <PlaceCard 
                  key={i}
                  title={place.title}
                  location={place.location}
                  desc={place.description}
                  distance={place.subtitle_or_distance}
                  rating={place.rating}
                  reviews={place.reviews}
                  tags={typeof place.tags === 'string' ? JSON.parse(place.tags) : (place.tags || [])}
                  image={AssetMap[place.imageKey]}
                />
              ))}
            </View>
            
            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </View>

      <BottomNav activeTab="Local Spots" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const FilterTab = ({ icon, text, color }: any) => (
  <TouchableOpacity style={styles.inactiveTab}>
    <Ionicons name={icon} size={14} color={color} />
    <Text style={styles.inactiveTabText}>{text}</Text>
  </TouchableOpacity>
);

const PlaceCard = ({ title, location, desc, distance, rating, reviews, tags, image }: any) => {
  return (
    <View style={styles.card}>
      {/* Left Image Section */}
      <View style={styles.cardImageContainer}>
        <Image source={image} style={styles.cardImage} />
        
        {/* Heart Icon on bottom left of image */}
        <TouchableOpacity style={styles.imageHeartBadge}>
          <Ionicons name="heart-outline" size={14} color="#2260FF" />
        </TouchableOpacity>
      </View>

      {/* Right Content Section */}
      <View style={styles.cardContent}>
        
        <View style={styles.cardHeaderRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={12} color="#EC4899" />
              <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
            </View>
          </View>
          
          <View style={styles.distanceBadge}>
            <Ionicons name="location-outline" size={12} color="#059669" />
            <Text style={styles.distanceText}>{distance}</Text>
          </View>
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
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={styles.ratingScore}>{rating}</Text>
            <Text style={styles.ratingCount}>({reviews})</Text>
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
    backgroundColor: '#EEF2FF',
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
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    zIndex: 10,
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
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  inactiveTab: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 6,
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
    borderColor: '#EEF2FF',
    marginLeft: 8,
    gap: 4,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2260FF',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapImagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '60%', 
    resizeMode: 'cover',
    opacity: 0.8,
  },
  mapControlsTopLeft: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 20,
  },
  listViewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  listViewText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B1B3D',
  },
  mapControlsRight: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 12,
    zIndex: 20,
  },
  mapControlBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#ffffff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mapControlText: {
    fontSize: 8,
    color: '#64748B',
    marginTop: -2,
    fontWeight: '500',
  },
  mapControlTextBlue: {
    fontSize: 8,
    color: '#2260FF',
    marginTop: -2,
    fontWeight: '600',
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  markerIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 4,
  },
  markerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  markerSubText: {
    fontSize: 9,
    color: '#64748B',
    textAlign: 'center',
  },
  bottomSheetScroll: {
    flex: 1,
  },
  bottomSheetScrollContent: {
    paddingTop: '65%', // Leaves space for the map to show through
  },
  bottomSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 16,
    paddingTop: 24,
    minHeight: Dimensions.get('window').height * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0B1B3D',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2260FF',
  },
  listContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
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
  imageHeartBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
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
    color: '#EC4899',
    flex: 1,
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
    fontSize: 9,
    fontWeight: '600',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 4,
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
});
