import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import { CustomButton } from '../components/Button';

const { width } = Dimensions.get('window');

interface DashboardProps {
  session: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ session }) => {
  const user = session?.user;
  const fullName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Explorer';

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Welcome back,</Text>
          <Text style={styles.nameText}>{fullName}</Text>
        </View>
        <TouchableOpacity style={styles.signOutIconButton} onPress={handleSignOut} activeOpacity={0.7}>
          <Feather name="log-out" size={20} color="#EA4335" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroOverlay}>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>AI Trip Planner</Text>
              <Text style={styles.heroSubtitle}>Let AI plan your next adventure in seconds</Text>
            </View>
            <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
              <Text style={styles.heroButtonText}>Plan a Trip</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#005ab5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#EBF3FF' }]}>
              <MaterialIcons name="flight-takeoff" size={22} color="#005ab5" />
            </View>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Trips Planned</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <MaterialIcons name="map" size={22} color="#2E7D32" />
            </View>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Saved Places</Text>
          </View>
        </View>

        {/* Recent Trips Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Itineraries</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Itinerary Cards */}
        <View style={styles.itineraryCard}>
          <View style={styles.itineraryInfo}>
            <View>
              <Text style={styles.itineraryTitle}>Alpine Magic</Text>
              <Text style={styles.itinerarySubtitle}>Zermatt, Switzerland • 6 Days</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: '#E3F2FD' }]}>
              <Text style={[styles.statusText, { color: '#0D47A1' }]}>Confirmed</Text>
            </View>
          </View>
          <View style={styles.itineraryFooter}>
            <View style={styles.itineraryDate}>
              <Feather name="calendar" size={14} color="#566069" style={{ marginRight: 4 }} />
              <Text style={styles.dateText}>Aug 15 - Aug 21</Text>
            </View>
            <TouchableOpacity style={styles.viewButton} activeOpacity={0.7}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itineraryCard}>
          <View style={styles.itineraryInfo}>
            <View>
              <Text style={styles.itineraryTitle}>Tropical Getaway</Text>
              <Text style={styles.itinerarySubtitle}>Maldives Resort • 5 Days</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: '#FFF3E0' }]}>
              <Text style={[styles.statusText, { color: '#E65100' }]}>Draft</Text>
            </View>
          </View>
          <View style={styles.itineraryFooter}>
            <View style={styles.itineraryDate}>
              <Feather name="calendar" size={14} color="#566069" style={{ marginRight: 4 }} />
              <Text style={styles.dateText}>Oct 02 - Oct 07</Text>
            </View>
            <TouchableOpacity style={styles.viewButton} activeOpacity={0.7}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Global Sign Out Button at bottom of scroll */}
        <View style={{ marginTop: 24 }}>
          <CustomButton title="Sign Out" onPress={handleSignOut} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greetingText: {
    fontSize: 14,
    color: '#566069',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#191c1e',
    marginTop: 2,
  },
  signOutIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e3e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heroCard: {
    height: 160,
    borderRadius: 20,
    backgroundColor: '#005ab5',
    marginTop: 16,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#005ab5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroTextContainer: {
    gap: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
    maxWidth: 220,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  heroButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#005ab5',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e3e5',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#191c1e',
  },
  statLabel: {
    fontSize: 12,
    color: '#566069',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191c1e',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#005ab5',
  },
  itineraryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e3e5',
    padding: 16,
    marginBottom: 12,
  },
  itineraryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itineraryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191c1e',
  },
  itinerarySubtitle: {
    fontSize: 13,
    color: '#566069',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  itineraryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f2f4f6',
    paddingTop: 12,
  },
  itineraryDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#566069',
  },
  viewButton: {
    backgroundColor: '#f2f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#191c1e',
  },
});
