import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { BottomNav } from '../components/BottomNav';
import { HeaderLogo } from '../components/HeaderLogo';
import { supabase } from '../lib/supabase';

export const Profile = ({ session, onNavigate }: any) => {
  const displayName = session?.user?.user_metadata?.full_name || session?.user?.email || 'Guest Explorer';

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase.auth.signOut();
              if (error) {
                Alert.alert('Error', error.message);
              }
            } catch (err: any) {
              Alert.alert('Error', err.message || 'An unexpected error occurred.');
            }
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is permanent and cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Info', 'Account deletion request submitted.');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Background */}
        <ImageBackground 
          source={require('../../assets/profile_bg.png')} 
          style={styles.headerBackground}
        >
          <SafeAreaView edges={['top']} style={styles.safeHeader}>
            <HeaderLogo />
          </SafeAreaView>
        </ImageBackground>

        {/* Profile Info Section (Overlapping) */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={require('../../assets/profile_avatar.png')} 
              style={styles.avatarImage} 
            />
            <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
              <MaterialIcons name="edit" size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userSubtitle}>Wanderer • Explorer • Dreamer</Text>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            <MenuItem 
              icon="wallet-outline" 
              title="Wallet" 
              subtitle="View your bookings, tickets, receipts and more" 
              iconColor="#2260FF" 
              iconBgColor="#EDF5FF" 
            />
            <MenuItem 
              icon="journal-outline" 
              title="Travel Journal" 
              subtitle="Relive your memories and stories from your trips" 
              iconColor="#8B5CF6" 
              iconBgColor="#F6EDFF" 
            />
            <MenuItem 
              icon="settings-outline" 
              title="App Settings" 
              subtitle="Manage your preferences and app configurations" 
              iconColor="#10B981" 
              iconBgColor="#E8FBF4" 
            />
            <MenuItem 
              icon="headset-outline" 
              title="Help & Support" 
              subtitle="Get help and find answers to common questions" 
              iconColor="#F97316" 
              iconBgColor="#FFF3E8" 
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.actionButton} 
              activeOpacity={0.7}
              onPress={handleSignOut}
            >
              <Ionicons name="log-out-outline" size={16} color="#ef4444" />
              <Text style={styles.actionButtonText}>Sign Out</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              activeOpacity={0.7}
              onPress={handleDeleteAccount}
            >
              <Ionicons name="trash-outline" size={16} color="#ef4444" />
              <Text style={styles.actionButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Shared Bottom Navigation */}
      <BottomNav activeTab="Profile" onNavigate={onNavigate} />
    </View>
  );
};

const MenuItem = ({ icon, title, subtitle, iconColor, iconBgColor }: any) => (
  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
    <View style={[styles.menuIconBg, { backgroundColor: iconBgColor }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </View>
    <Feather name="chevron-right" size={20} color="#2260FF" style={{ opacity: 0.8 }} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // or white if they prefer
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerBackground: {
    width: '100%',
    height: 220,
    backgroundColor: '#2260FF',
  },
  safeHeader: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  profileSection: {
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40, // overlap the background
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -50, // pull it up to break the border
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4060F0',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0d1b2a',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 32,
  },
  menuContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#191c1e',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
    gap: 8,
    backgroundColor: 'transparent',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ef4444',
  },
});
