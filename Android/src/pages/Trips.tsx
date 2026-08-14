import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';
import { HeaderLogo } from '../components/HeaderLogo';
import { supabase } from '../lib/supabase';
import { AssetMap } from '../lib/assets';

const { width } = Dimensions.get('window');

export const Trips = ({ session, onNavigate }: any) => {
  const [tripsData, setTripsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('app-data', {
          body: { target: 'trips' }
        });
        if (!error && data?.success) {
          setTripsData(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch trips data", err);
      }
    };
    fetchTrips();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <HeaderLogo title="My Trips" />
        <TouchableOpacity activeOpacity={0.8}>
          <Image source={require('../../assets/profile_user.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Upcoming Trips */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Feather name="calendar" size={18} color="#2260FF" />
              <Text style={styles.sectionTitle}>Upcoming Trips</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All {'>'}</Text>
            </TouchableOpacity>
          </View>
          
          {tripsData?.slice(0, 2).map((trip: any, i: number) => (
            <UpcomingTripCard 
              key={i}
              title={trip.title} 
              location={trip.title.split(' ')[0]} 
              date={trip.date_range} 
              image={AssetMap[trip.image_key] || AssetMap['trip_kashmir']} 
              daysLeft="Upcoming" 
              people="2" 
            />
          ))}
        </View>

        {/* Current Trip */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="bag-handle-outline" size={18} color="#10B981" />
              <Text style={styles.sectionTitle}>Current Trip</Text>
            </View>
          </View>
          
          <View style={styles.currentTripCard}>
            <View style={styles.currentTripTop}>
              <Image source={require('../../assets/trip_kashmir.png')} style={styles.currentTripImage} />
              <View style={styles.currentTripDetails}>
                <View style={styles.titleRow}>
                  <Text style={styles.cardTitle}>Kashmir Paradise</Text>
                  <TouchableOpacity>
                    <Feather name="more-vertical" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardSubtitle}>Srinagar, Gulmarg, Pahalgam</Text>
                
                <View style={styles.dateRow}>
                  <Feather name="calendar" size={12} color="#10B981" />
                  <Text style={styles.dateText}>26 May - 30 May, 2025</Text>
                </View>
                
                <View style={styles.progressRow}>
                  <View style={styles.daysLeftBadgeGreen}>
                    <Ionicons name="location-outline" size={12} color="#10B981" />
                    <Text style={styles.daysLeftTextGreen}>2 days left</Text>
                  </View>
                  
                  <View style={styles.progressCircleContainer}>
                    <View style={styles.progressCircle}>
                      <Text style={styles.progressPercentage}>60%</Text>
                    </View>
                    <Text style={styles.progressLabel}>Completed</Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.currentTripBottomRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="document-text-outline" size={18} color="#2260FF" />
                <Text style={styles.actionButtonText}>Itinerary</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="business-outline" size={18} color="#10B981" />
                <Text style={styles.actionButtonText}>Bookings</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="map" size={18} color="#F97316" />
                <Text style={styles.actionButtonText}>Map</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="wallet-outline" size={18} color="#2260FF" />
                <Text style={styles.actionButtonText}>Expenses</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Previous Trips */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Ionicons name="briefcase-outline" size={18} color="#2260FF" />
              <Text style={styles.sectionTitle}>Previous Trips</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All {'>'}</Text>
            </TouchableOpacity>
          </View>
          
          <PreviousTripCard 
            title="Rajasthan Heritage Tour" 
            location="Jaipur, Udaipur, Jodhpur" 
            date="10 Apr - 18 Apr, 2025" 
            image={require('../../assets/season_udaipur.png')} 
          />
          <PreviousTripCard 
            title="Kerala Backwaters" 
            location="Kochi, Alleppey, Munnar" 
            date="05 Mar - 10 Mar, 2025" 
            image={require('../../assets/trip_kerala.png')} 
          />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Floating Add Trip Button */}
      <View style={styles.floatingAddContainer}>
        <TouchableOpacity style={styles.addTripButton} activeOpacity={0.8}>
          <Feather name="plus" size={18} color="#ffffff" />
          <Text style={styles.addTripButtonText}>New Trip</Text>
        </TouchableOpacity>
      </View>

      <BottomNav activeTab="Trips" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const UpcomingTripCard = ({ title, location, date, image, daysLeft, people }: any) => (
  <View style={styles.listCard}>
    <Image source={image} style={styles.cardImageSquare} />
    <View style={styles.cardDetails}>
      <View style={styles.titleRow}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardSubtitle}>{location}</Text>
      <View style={styles.dateRow}>
        <Feather name="calendar" size={12} color="#9CA3AF" />
        <Text style={styles.dateText}>{date}</Text>
      </View>
      
      <View style={styles.badgesRow}>
        <View style={styles.badgePurple}>
          <Ionicons name="airplane-outline" size={12} color="#8B5CF6" />
          <Text style={styles.badgeTextPurple}>{daysLeft}</Text>
        </View>
        <View style={styles.badgeBlue}>
          <Feather name="users" size={12} color="#2260FF" />
          <Text style={styles.badgeTextBlue}>{people}</Text>
        </View>
      </View>
    </View>
  </View>
);

const PreviousTripCard = ({ title, location, date, image }: any) => (
  <View style={styles.listCard}>
    <Image source={image} style={styles.cardImageWide} />
    <View style={styles.cardDetails}>
      <View style={styles.titleRow}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardSubtitle}>{location}</Text>
      <View style={styles.dateRow}>
        <Feather name="calendar" size={12} color="#9CA3AF" />
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={styles.badgeGreenOutline}>
        <Feather name="check" size={12} color="#10B981" />
        <Text style={styles.badgeTextGreen}>Completed</Text>
      </View>
    </View>
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
    paddingBottom: 8,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0d1b2a',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2260FF',
  },
  // List Cards
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  cardImageSquare: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  cardImageWide: {
    width: 100,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d1b2a',
    flex: 1,
    paddingRight: 8,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgePurple: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeTextPurple: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  badgeBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF5FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeTextBlue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2260FF',
  },
  badgeGreenOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FBF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    alignSelf: 'flex-start',
  },
  badgeTextGreen: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
  },
  // Current Trip Card
  currentTripCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  currentTripTop: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  currentTripImage: {
    width: 110,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
  },
  currentTripDetails: {
    flex: 1,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 4,
  },
  daysLeftBadgeGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8FBF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginBottom: 8,
  },
  daysLeftTextGreen: {
    fontSize: 10,
    fontWeight: '600',
    color: '#10B981',
  },
  progressCircleContainer: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: '#10B981',
    borderRightColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  progressPercentage: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0d1b2a',
  },
  progressLabel: {
    fontSize: 9,
    color: '#9CA3AF',
  },
  currentTripBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 11,
    color: '#4b5563',
    fontWeight: '500',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: '#e5e7eb',
  },
  // Floating Add Button
  floatingAddContainer: {
    position: 'absolute',
    bottom: 90, // Above bottom nav
    alignSelf: 'center',
    zIndex: 10,
  },
  addTripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4060F0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#4060F0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addTripButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
