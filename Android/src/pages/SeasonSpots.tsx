import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.45;

export const SeasonSpots = ({ onNavigate }: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate?.('Dashboard')}>
          <Feather name="chevron-left" size={24} color="#0B1B3D" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.headerIconContainer}>
            <Ionicons name="snow-outline" size={20} color="#2260FF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Popular Season Spots</Text>
            <Text style={styles.headerSubtitle}>Best places to visit in every season</Text>
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
            <Text style={styles.activeTabText}>All Seasons</Text>
          </View>
          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons name="snow-outline" size={14} color="#64748B" />
            <Text style={styles.inactiveTabText}>Winter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons name="flower-outline" size={14} color="#64748B" />
            <Text style={styles.inactiveTabText}>Spring</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons name="sunny-outline" size={14} color="#64748B" />
            <Text style={styles.inactiveTabText}>Summer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons name="rainy-outline" size={14} color="#64748B" />
            <Text style={styles.inactiveTabText}>Monsoon</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}>
            <Ionicons name="leaf-outline" size={14} color="#64748B" />
            <Text style={styles.inactiveTabText}>Autumn</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Banner */}
        <ImageBackground 
          source={require('../../assets/trip_kashmir.png')} 
          style={styles.heroBanner}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Every Season, A New Journey</Text>
            <Text style={styles.heroSubtitle}>Handpicked destinations that shine in their perfect season.</Text>
            
            <TouchableOpacity style={styles.heroButton}>
              <Ionicons name="calendar-outline" size={16} color="#2260FF" />
              <Text style={styles.heroButtonText}>Plan Your Trip</Text>
              <Feather name="arrow-right" size={16} color="#ffffff" style={styles.heroButtonArrowBg} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Winter Wonders */}
        <SeasonSection 
          title="Winter Wonders" 
          months="Dec – Feb" 
          icon="snow-outline" 
          iconColor="#2260FF" 
          titleColor="#0B1B3D"
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <SeasonCard 
              title="Manali" location="Himachal Pradesh" rating="4.8" tags={['Snow', 'Adventure']}
              image={require('../../assets/season_manali.png')}
            />
            <SeasonCard 
              title="Auli" location="Uttarakhand" rating="4.7" tags={['Snow', 'Skiing']}
              image={require('../../assets/trip_kashmir.png')}
            />
            <SeasonCard 
              title="Shimla" location="Himachal Pradesh" rating="4.6" tags={['Snow', 'Heritage']}
              image={require('../../assets/season_darjeeling.png')}
            />
          </ScrollView>
        </SeasonSection>

        {/* Spring Blooms */}
        <SeasonSection 
          title="Spring Blooms" 
          months="Mar – Apr" 
          icon="flower-outline" 
          iconColor="#10B981" 
          titleColor="#10B981"
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <SeasonCard 
              title="Kashmir Valley" location="Jammu & Kashmir" rating="4.7" tags={['Nature', 'Scenic']} tagColor="#E8FBF4" tagTextColor="#10B981"
              image={require('../../assets/trip_kashmir.png')}
            />
            <SeasonCard 
              title="Coorg" location="Karnataka" rating="4.6" tags={['Nature', 'Relaxation']} tagColor="#E8FBF4" tagTextColor="#10B981"
              image={require('../../assets/trip_kerala.png')}
            />
            <SeasonCard 
              title="Ooty" location="Tamil Nadu" rating="4.5" tags={['Nature', 'Pleasant']} tagColor="#E8FBF4" tagTextColor="#10B981"
              image={require('../../assets/season_udaipur.png')}
            />
          </ScrollView>
        </SeasonSection>

        {/* Summer Escapes */}
        <SeasonSection 
          title="Summer Escapes" 
          months="May – Jun" 
          icon="sunny-outline" 
          iconColor="#F59E0B" 
          titleColor="#F59E0B"
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            <SeasonCard 
              title="Goa" location="Goa" rating="4.6" tags={['Beach', 'Party']}
              image={require('../../assets/hotspot_cafe.png')}
            />
            <SeasonCard 
              title="Andaman" location="Andaman & Nicobar" rating="4.7" tags={['Beach', 'Scenic']}
              image={require('../../assets/season_manali.png')}
            />
            <SeasonCard 
              title="Munnar" location="Kerala" rating="4.6" tags={['Nature', 'Hill Station']} tagColor="#E8FBF4" tagTextColor="#10B981"
              image={require('../../assets/trip_kerala.png')}
            />
          </ScrollView>
        </SeasonSection>

        {/* Monsoon Magic */}
        <SeasonSection 
          title="Monsoon Magic" 
          months="Jul – Sep" 
          icon="rainy-outline" 
          iconColor="#0ea5e9" 
          titleColor="#0ea5e9"
        >
        </SeasonSection>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Dashboard" onNavigate={onNavigate} />
    </SafeAreaView>
  );
};

const SeasonSection = ({ title, months, icon, iconColor, titleColor, children }: any) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <Ionicons name={icon} size={20} color={iconColor} />
          <Text style={[styles.sectionTitle, { color: titleColor }]}>{title}</Text>
          <Text style={styles.sectionMonths}>{months}</Text>
        </View>
        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={styles.viewAllText}>View All</Text>
          <Feather name="chevron-right" size={14} color="#2260FF" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const SeasonCard = ({ title, location, rating, tags, tagColor = '#EDF5FF', tagTextColor = '#2260FF', image }: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImageContainer}>
        <Image source={image} style={styles.cardImage} />
        
        {/* Floating Heart */}
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart-outline" size={16} color="#ffffff" />
        </TouchableOpacity>

        {/* Floating Rating */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{rating}</Text>
          <Ionicons name="star" size={10} color="#F59E0B" />
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={12} color="#2260FF" />
          <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
        </View>
        
        <View style={styles.tagsRow}>
          {tags.map((tag: string, index: number) => (
            <View key={index} style={[styles.tag, { backgroundColor: tagColor }]}>
              <Text style={[styles.tagText, { color: tagTextColor }]}>{tag}</Text>
            </View>
          ))}
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
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tabsContainer: {
    gap: 8,
    paddingRight: 16,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  inactiveTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  heroBanner: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.75)', // Light overlay to make text readable based on mockup
    padding: 16,
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
    width: '70%',
    marginBottom: 16,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    position: 'absolute',
    bottom: 16,
    right: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heroButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2260FF',
  },
  heroButtonArrowBg: {
    backgroundColor: '#2260FF',
    borderRadius: 10,
    padding: 2,
    overflow: 'hidden',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  sectionMonths: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2260FF',
  },
  horizontalScroll: {
    gap: 16,
    paddingRight: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImageContainer: {
    width: '100%',
    height: CARD_WIDTH * 0.9,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0B1B3D',
  },
  cardContent: {
    paddingHorizontal: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B1B3D',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  locationText: {
    fontSize: 10,
    color: '#64748B',
    flex: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
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
});
