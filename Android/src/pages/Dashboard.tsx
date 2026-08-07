import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface DashboardProps {
  session?: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ session }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIconBg}>
              <MaterialIcons name="location-on" size={24} color="#005ab5" style={{ position: 'absolute' }} />
              <MaterialIcons name="flight" size={14} color="#ffffff" style={{ zIndex: 1, marginTop: -2 }} />
            </View>
            <Text style={styles.logoText}>
              Trip<Text style={styles.logoTextAI}>AI</Text>
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={require('../../assets/profile_user.png')}
              style={styles.profileImage}
            />
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
                <Text style={styles.heroTitle}>Your Journey,{'\n'}Perfected by AI</Text>
                <Text style={styles.heroSubtitle}>Plan smart. Travel better.</Text>
              </View>
              <TouchableOpacity style={styles.heroButton} activeOpacity={0.8}>
                <MaterialCommunityIcons name="magic-staff" size={16} color="#ffffff" />
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
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              <HolidayCard
                icon="flag"
                iconColor="#F57C00"
                bgColor="#FFF3E0"
                title="Independence Day"
                date="15 Aug, 2025"
                day="Friday"
                dateColor="#F57C00"
              />
              <HolidayCard
                icon="moon-waning-crescent"
                iconColor="#388E3C"
                bgColor="#E8F5E9"
                title="Eid al-Adha"
                date="07 Jun, 2025"
                day="Saturday"
                dateColor="#388E3C"
              />
              <HolidayCard
                icon="om"
                iconColor="#D81B60"
                bgColor="#FCE4EC"
                title="Ganesh Chaturthi"
                date="27 Aug, 2025"
                day="Wednesday"
                dateColor="#D81B60"
              />
              <HolidayCard
                icon="candle"
                iconColor="#8E24AA"
                bgColor="#F3E5F5"
                title="Diwali"
                date="20 Oct, 2025"
                day="Monday"
                dateColor="#8E24AA"
              />
            </ScrollView>
          </View>

          {/* Hotspots Near You */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View>
                <View style={styles.sectionTitleRow}>
                  <Feather name="map-pin" size={18} color="#8E24AA" />
                  <Text style={styles.sectionTitle}>Hotspots Near You</Text>
                </View>
                <Text style={styles.sectionSubtitle}>Perfect spots for your weekend plans</Text>
              </View>
              <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              <HotspotCard
                image={require('../../assets/hotspot_cafe.png')}
                icon="coffee"
                iconColor="#8E24AA"
                title="Cafe Culture"
                distance="1.2 km away"
              />
              <HotspotCard
                image={require('../../assets/hotspot_garden.png')}
                icon="sun"
                iconColor="#388E3C"
                title="City Gardens"
                distance="2.5 km away"
              />
              <HotspotCard
                image={require('../../assets/hotspot_sunset.png')}
                icon="camera"
                iconColor="#F57C00"
                title="Sunset Point"
                distance="3.1 km away"
              />
              <HotspotCard
                image={require('../../assets/hotspot_market.png')}
                icon="shopping-bag"
                iconColor="#0277BD"
                title="Local Markets"
                distance="1.8 km away"
              />
            </ScrollView>
          </View>

          {/* Popular Season Spots */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Feather name="image" size={18} color="#005ab5" />
                <Text style={styles.sectionTitle}>Popular Season Spots</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              <SeasonSpotCard
                image={require('../../assets/season_manali.png')}
                title="Manali"
                subtitle="Himachal Pradesh"
              />
              <SeasonSpotCard
                image={require('../../assets/season_goa.png')}
                title="Goa"
                subtitle="Goa"
              />
              <SeasonSpotCard
                image={require('../../assets/season_munnar.png')}
                title="Munnar"
                subtitle="Kerala"
              />
              <SeasonSpotCard
                image={require('../../assets/season_jaipur.png')}
                title="Jaipur"
                subtitle="Rajasthan"
              />
            </ScrollView>
          </View>

          {/* Tips for Travelers */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Feather name="shield" size={18} color="#005ab5" />
                <Text style={styles.sectionTitle}>Tips for Travelers</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
              <TipCard icon="briefcase" title="Pack Smart" subtitle="Make a checklist and pack light." />
              <TipCard icon="map" title="Plan Ahead" subtitle="Book early for better deals." />
              <TipCard icon="shield" title="Stay Safe" subtitle="Keep documents and backups." />
              <TipCard icon="camera" title="Capture Memories" subtitle="Collect moments, not things." />
            </ScrollView>
          </View>
        </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="grid" label="Dashboard" active />
        <NavItem icon="map-pin" label="Local Spots" />
        <NavItem icon="star" label="Trip Planner AI" />
        <NavItem icon="briefcase" label="Trips" />
        <NavItem icon="user" label="Profile" />
      </View>
    </SafeAreaView>
  );
};

// --- Sub Components ---

const HolidayCard = ({ icon, iconColor, bgColor, title, date, day, dateColor }: any) => (
  <View style={styles.holidayCard}>
    <View style={[styles.holidayIconWrap, { backgroundColor: bgColor }]}>
      <MaterialCommunityIcons name={icon} size={28} color={iconColor} />
    </View>
    <Text style={styles.holidayTitle} numberOfLines={1}>{title}</Text>
    <Text style={[styles.holidayDate, { color: dateColor }]}>{date}</Text>
    <Text style={styles.holidayDay}>{day}</Text>
  </View>
);

const HotspotCard = ({ image, icon, iconColor, title, distance }: any) => (
  <ImageBackground source={image} style={styles.hotspotCard} imageStyle={{ borderRadius: 16 }}>
    <View style={styles.cardOverlayGradient} />
    <View style={styles.hotspotContent}>
      <View style={styles.hotspotIconBadge}>
        <Feather name={icon} size={16} color={iconColor} />
      </View>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{distance}</Text>
      </View>
    </View>
  </ImageBackground>
);

const SeasonSpotCard = ({ image, title, subtitle }: any) => (
  <ImageBackground source={image} style={styles.seasonCard} imageStyle={{ borderRadius: 16 }}>
    <View style={styles.cardOverlayGradient} />
    <TouchableOpacity style={styles.heartIcon}>
      <Feather name="heart" size={18} color="#ffffff" />
    </TouchableOpacity>
    <View style={styles.seasonContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </ImageBackground>
);

const TipCard = ({ icon, title, subtitle }: any) => (
  <View style={styles.tipCard}>
    <View style={styles.tipIconWrap}>
      <Feather name={icon} size={20} color="#2260FF" />
    </View>
    <View style={styles.tipTextWrap}>
      <Text style={styles.tipTitle}>{title}</Text>
      <Text style={styles.tipSubtitle}>{subtitle}</Text>
    </View>
  </View>
);

const NavItem = ({ icon, label, active }: any) => (
  <TouchableOpacity style={styles.navItem}>
    <Feather name={icon} size={22} color={active ? '#2260FF' : '#9CA3AF'} />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconBg: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#191c1e',
  },
  logoTextAI: {
    color: '#2260FF',
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
    marginTop: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 24,
    justifyContent: 'space-between',
  },
  heroTextContainer: {},
  heroTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    color: '#ffffff',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2260FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  heroButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#191c1e',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
    marginLeft: 26,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2260FF',
  },
  horizontalScroll: {
    paddingHorizontal: 24,
    gap: 16,
  },
  // Holiday Cards
  holidayCard: {
    width: 130,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  holidayIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  holidayTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#191c1e',
    textAlign: 'center',
    marginBottom: 6,
  },
  holidayDate: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  holidayDay: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  // Hotspot & Season Cards
  hotspotCard: {
    width: 140,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
  },
  seasonCard: {
    width: 140,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 12,
  },
  cardOverlayGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    top: '40%', // Simulates a bottom gradient
  },
  hotspotContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 12,
  },
  hotspotIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#e0e0e0',
    marginTop: 2,
  },
  seasonContent: {
    zIndex: 1,
  },
  heartIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  // Tips Cards
  tipCard: {
    width: 220,
    flexDirection: 'row',
    backgroundColor: '#F3F8FE',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  tipIconWrap: {
    marginRight: 12,
  },
  tipTextWrap: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#191c1e',
    marginBottom: 2,
  },
  tipSubtitle: {
    fontSize: 11,
    color: '#566069',
    lineHeight: 16,
  },
  // Bottom Nav
  bottomNav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
    textAlign: 'center',
  },
  navLabelActive: {
    color: '#2260FF',
    fontWeight: '700',
  },
});
