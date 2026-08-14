import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';
import { supabase } from '../lib/supabase';
import { AssetMap } from '../lib/assets';

export const Holidays = ({ onNavigate }: any) => {
  const [holidaysData, setHolidaysData] = useState<any[]>([]);

  useEffect(() => {
    const fetchHolidaysData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('app-data', {
          body: { target: 'holidays' }
        });
        if (!error && data?.success) {
          setHolidaysData(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch holidays data", err);
      }
    };
    fetchHolidaysData();
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate?.('Dashboard')}>
          <Feather name="chevron-left" size={24} color="#0B1B3D" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.calendarIconContainer}>
            <Ionicons name="calendar-outline" size={20} color="#2260FF" />
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Holidays 2025</Text>
            <Text style={styles.headerSubtitle}>All upcoming holidays this year</Text>
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
            <Text style={styles.activeTabText}>All Holidays</Text>
          </View>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Long Weekends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>National</Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={16} color="#64748B" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Holiday Cards List */}
        <View style={styles.cardsList}>
          {holidaysData?.map((item: any, i: number) => (
            <HolidayCard 
              key={i}
              title={item.title}
              desc={item.desc}
              badgeType={item.badgeType}
              day={item.day}
              date={item.date}
              month={item.month}
              image={AssetMap[item.imageKey]}
              icon={item.icon}
            />
          ))}
        </View>

        {/* Bottom Banner */}
        <View style={styles.bottomBanner}>
          <View style={styles.bannerIconBox}>
            <Ionicons name="briefcase-outline" size={24} color="#2260FF" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Plan your long weekends</Text>
            <Text style={styles.bannerDesc}>Make the most of your holidays</Text>
          </View>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>View Long Weekends</Text>
            <Feather name="chevron-right" size={16} color="#2260FF" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Dashboard" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const HolidayCard = ({ title, desc, badgeType, day, date, month, image, icon }: any) => {
  const isNational = badgeType === 'national';
  return (
    <View style={styles.card}>
      <View style={styles.cardImageContainer}>
        <Image source={image} style={styles.cardImage} />
        <View style={styles.cardIconBadge}>
          <Ionicons name={icon} size={16} color="#6B21A8" />
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
        
        <View style={[styles.badge, isNational ? styles.badgeNational : styles.badgeFestival]}>
          <Text style={[styles.badgeText, isNational ? styles.badgeTextNational : styles.badgeTextFestival]}>
            {isNational ? 'National Holiday' : 'Festival'}
          </Text>
        </View>
      </View>

      <View style={styles.cardDate}>
        <Text style={styles.dateDay}>{day}</Text>
        <Text style={styles.dateNum}>{date}</Text>
        <Text style={styles.dateMonth}>{month}</Text>
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
  calendarIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EDF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FAFAFA',
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
    marginRight: 16,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
  },
  cardIconBadge: {
    position: 'absolute',
    bottom: -6,
    left: -6,
    backgroundColor: '#ffffff',
    width: 28,
    height: 28,
    borderRadius: 14,
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
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B1B3D',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeNational: {
    backgroundColor: '#EDF5FF',
  },
  badgeFestival: {
    backgroundColor: '#E8FBF4',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '600',
  },
  badgeTextNational: {
    color: '#2260FF',
  },
  badgeTextFestival: {
    color: '#10B981',
  },
  cardDate: {
    alignItems: 'center',
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#F1F5F9',
  },
  dateDay: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3b82f6',
    marginBottom: 2,
  },
  dateNum: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 2,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  bottomBanner: {
    backgroundColor: '#EDF5FF', // Fallback
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0B1B3D',
    marginBottom: 2,
  },
  bannerDesc: {
    fontSize: 11,
    color: '#64748B',
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  bannerButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2260FF',
  },
});
