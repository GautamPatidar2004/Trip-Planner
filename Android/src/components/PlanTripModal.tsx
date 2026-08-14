import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Platform, KeyboardAvoidingView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

interface PlanTripModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PlanTripModal = ({ visible, onClose }: PlanTripModalProps) => {
  const [members, setMembers] = useState(4);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.overlay} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity style={styles.dismissArea} onPress={onClose} activeOpacity={1} />
        
        <View style={styles.modalContent}>
          {/* Drag Handle & Close Button */}
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Feather name="x" size={20} color="#0B1B3D" />
            </TouchableOpacity>
          </View>

          {/* Titles */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Plan New Trip</Text>
            <Text style={styles.subtitle}>Tell us your preferences and we'll handle the rest</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            
            {/* Travel Dates */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="calendar-outline" size={16} color="#2260FF" />
                <Text style={styles.label}>Travel Dates</Text>
              </View>
              <View style={styles.rowBetween}>
                <View style={styles.dateBox}>
                  <View>
                    <Text style={styles.subLabel}>From</Text>
                    <Text style={styles.dateText}>15 Jun, 2025</Text>
                  </View>
                  <Ionicons name="calendar-outline" size={20} color="#2260FF" />
                </View>
                
                <Feather name="arrow-right" size={16} color="#94A3B8" style={{ marginHorizontal: 8 }} />
                
                <View style={styles.dateBox}>
                  <View>
                    <Text style={styles.subLabel}>To</Text>
                    <Text style={styles.dateText}>20 Jun, 2025</Text>
                  </View>
                  <Ionicons name="calendar-outline" size={20} color="#2260FF" />
                </View>
              </View>
            </View>

            {/* Destination */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="location-outline" size={16} color="#2260FF" />
                <Text style={styles.label}>Where do you want to go?</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Search destination or place"
                  placeholderTextColor="#94A3B8"
                />
                <Feather name="search" size={20} color="#94A3B8" />
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll}>
                {['Manali', 'Goa', 'Kerala', 'Himachal', 'Ladakh'].map((place) => (
                  <TouchableOpacity key={place} style={styles.pill}>
                    <Text style={styles.pillText}>{place}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Vibe & Budget Row */}
            <View style={styles.rowBetween}>
              <View style={styles.halfWidth}>
                <View style={styles.labelRow}>
                  <Ionicons name="color-wand-outline" size={16} color="#2260FF" />
                  <Text style={styles.label}>What vibe are you looking for?</Text>
                </View>
                <View style={styles.dropdownBox}>
                  <Text style={styles.dropdownText}>🏔️ Adventure & Nature</Text>
                  <Feather name="chevron-down" size={16} color="#0B1B3D" />
                </View>
              </View>
              
              <View style={styles.halfWidth}>
                <View style={styles.labelRow}>
                  <Ionicons name="wallet-outline" size={16} color="#2260FF" />
                  <Text style={styles.label}>Budget (Total)</Text>
                </View>
                <View style={styles.dropdownBox}>
                  <Text style={styles.dropdownText}>₹ 20,000 - ₹ 30,000</Text>
                  <Feather name="chevron-down" size={16} color="#0B1B3D" />
                </View>
              </View>
            </View>

            {/* Members & Transport Row */}
            <View style={styles.rowBetween}>
              <View style={styles.halfWidth}>
                <View style={styles.labelRow}>
                  <Ionicons name="people-outline" size={16} color="#2260FF" />
                  <Text style={styles.label}>No. of Members</Text>
                </View>
                <View style={styles.counterBox}>
                  <TouchableOpacity onPress={() => setMembers(Math.max(1, members - 1))}>
                    <Feather name="minus" size={20} color="#0B1B3D" />
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{members}</Text>
                  <TouchableOpacity onPress={() => setMembers(members + 1)}>
                    <Feather name="plus" size={20} color="#0B1B3D" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.halfWidth}>
                <View style={styles.labelRow}>
                  <Ionicons name="bus-outline" size={16} color="#2260FF" />
                  <Text style={styles.label}>Preferred Mode of Transport</Text>
                </View>
                <View style={styles.dropdownBox}>
                  <Text style={styles.dropdownText}>Any</Text>
                  <Feather name="chevron-down" size={16} color="#0B1B3D" />
                </View>
              </View>
            </View>

            {/* Additional Preferences */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="star-outline" size={16} color="#2260FF" />
                <Text style={styles.label}>Additional Preferences (Optional)</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="E.g. Sea view, luxury stay, vegetarian food"
                  placeholderTextColor="#94A3B8"
                />
                <Feather name="edit-2" size={16} color="#94A3B8" />
              </View>
            </View>

            {/* Trip Type */}
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Ionicons name="briefcase-outline" size={16} color="#2260FF" />
                <Text style={styles.label}>Trip Type</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll}>
                <TouchableOpacity style={styles.activePill}>
                  <Text style={styles.activePillText}>Leisure</Text>
                  <Ionicons name="checkmark-circle" size={16} color="#2260FF" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
                {['Honeymoon', 'Family', 'Friends', 'Solo'].map((type) => (
                  <TouchableOpacity key={type} style={styles.inactivePill}>
                    <Text style={styles.inactivePillText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={{ height: 20 }} />
          </ScrollView>

          {/* Bottom Fixed Section */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.createButton} onPress={onClose}>
              <Ionicons name="sparkles-outline" size={20} color="#ffffff" />
              <Text style={styles.createButtonText}>Create My Trip</Text>
            </TouchableOpacity>
            
            <View style={styles.disclaimerRow}>
              <Ionicons name="sparkles" size={14} color="#94A3B8" />
              <Text style={styles.disclaimerText}>Our AI will suggest the best itinerary for you!</Text>
            </View>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '90%', // approximate height from mockup
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0B1B3D',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0B1B3D',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  halfWidth: {
    width: '48%',
  },
  dateBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  subLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0B1B3D',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: '#ffffff',
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#0B1B3D',
  },
  pillsScroll: {
    marginTop: 12,
    flexDirection: 'row',
  },
  pill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2260FF',
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: '#ffffff',
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  counterBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: '#ffffff',
  },
  counterText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B1B3D',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#2260FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2260FF',
  },
  inactivePill: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  inactivePillText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2260FF',
    borderRadius: 16,
    height: 56,
    gap: 8,
    marginBottom: 16,
    shadowColor: '#2260FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  disclaimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#64748B',
  },
});
