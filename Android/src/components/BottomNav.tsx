import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.navItem} activeOpacity={0.7} onPress={onPress}>
    <Feather name={icon as any} size={22} color={active ? '#2260FF' : '#9CA3AF'} />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

export const BottomNav = ({ activeTab, onNavigate }: { activeTab: string, onNavigate?: (tab: string) => void }) => {
  return (
    <View style={styles.bottomNav}>
      <NavItem icon="grid" label="Dashboard" active={activeTab === 'Dashboard'} onPress={() => onNavigate?.('Dashboard')} />
      <NavItem icon="map-pin" label="Local Spots" active={activeTab === 'Local Spots'} onPress={() => onNavigate?.('Local Spots')} />
      
      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => onNavigate?.('Trip Planner AI')}>
          <MaterialCommunityIcons name="magic-staff" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={[styles.navLabel, activeTab === 'Trip Planner AI' && styles.navLabelActive, { marginTop: 4 }]}>
          Trip Planner AI
        </Text>
      </View>

      <NavItem icon="briefcase" label="Trips" active={activeTab === 'Trips'} onPress={() => onNavigate?.('Trips')} />
      <NavItem icon="user" label="Profile" active={activeTab === 'Profile'} onPress={() => onNavigate?.('Profile')} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    alignItems: 'flex-end',
    height: 70, // Fixed height to handle the FAB overlap properly
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
    gap: 4,
    height: '100%',
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
  fabContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
    height: '100%',
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2260FF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    shadowColor: '#2260FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  }
});
