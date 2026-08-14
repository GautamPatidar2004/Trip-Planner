import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';
import { supabase } from '../lib/supabase';
import { AssetMap } from '../lib/assets';

export const Hotspots = ({ onNavigate }: any) => {
  const [hotspotsData, setHotspotsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchHotspotsData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('app-data', {
          body: { target: 'hotspots' }
        });
        if (!error && data?.success) {
          setHotspotsData(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch hotspots data", err);
      }
    };
    fetchHotspotsData();
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate?.('Dashboard')}>
          <Feather name="chevron-left" size={24} color="#0B1B3D" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="location-outline" size={20} color="#2260FF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Hotspots Near You</Text>
            <Text style={styles.headerSubtitle}>Discover amazing places around you</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Feather name="search" size={20} color="#0B1B3D" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>All</Text>
          </View>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Attractions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Food & Cafes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Adventure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Shopping</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={16} color="#64748B" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Current Location Banner */}
        <View style={styles.locationBanner}>
          <View style={styles.locationBannerLeft}>
            <Ionicons name="location-outline" size={20} color="#2260FF" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.locationBannerTitle}>Current Location</Text>
              <Text style={styles.locationBannerSubtitle}>Connaught Place, New Delhi</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.changeButton}>
            <Ionicons name="locate" size={16} color="#2260FF" />
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Hotspot Cards List */}
        <View style={styles.cardsList}>
          {hotspotsData?.map((item: any, i: number) => (
            <HotspotCard 
              key={i}
              title={item.title}
              category={item.subtitle_or_distance}
              desc={item.description}
              distance={item.location}
              rating={item.rating}
              reviews={`(${item.reviews})`}
              image={AssetMap[item.imageKey]}
              icon={item.icon || 'star'}
            />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Dashboard" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const HotspotCard = ({ title, category, desc, distance, rating, reviews, image, icon }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImageContainer}>
        <Image source={image} style={styles.cardImage} />
        <View style={styles.cardIconBadge}>
          <Ionicons name={icon} size={14} color="#ffffff" />
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={20} color="#2260FF" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.cardCategory} numberOfLines={1}>{category}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{desc}</Text>
        
        <View style={styles.cardBottomRow}>
          <View style={styles.badgesContainer}>
            <View style={styles.distanceBadge}>
              <Ionicons name="location-outline" size={12} color="#10B981" />
              <Text style={styles.distanceBadgeText}>{distance}</Text>
            </View>
            
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingBadgeText}>{rating}</Text>
              <Text style={styles.ratingBadgeReviews}>{reviews}</Text>
            </View>
          </View>
          
          <Text style={styles.distanceTextBottom}>{distance}</Text>
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
    borderRadius: 12,
    backgroundColor: '#EDF5FF',
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
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tabsContainer: {
    gap: 8,
    paddingRight: 16,
  },
  activeTab: {
    backgroundColor: '#EDF5FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2260FF',
  },
  inactiveTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    borderColor: '#F1F5F9',
    gap: 4,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  locationBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationBannerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B1B3D',
    marginBottom: 2,
  },
  locationBannerSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2260FF',
  },
  cardsList: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  cardImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  cardIconBadge: {
    position: 'absolute',
    bottom: -6,
    left: -6,
    backgroundColor: '#2260FF',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B1B3D',
    flex: 1,
    marginRight: 8,
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2260FF',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 10,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FBF4',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  distanceBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  ratingBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F59E0B',
  },
  ratingBadgeReviews: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  distanceTextBottom: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2260FF',
  },
});
