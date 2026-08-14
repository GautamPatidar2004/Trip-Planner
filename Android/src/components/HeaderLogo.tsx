import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export const HeaderLogo = ({ title = "AI Trip Planner" }: { title?: string }) => {
  return (
    <View style={styles.logoContainer}>
      <Image source={require('../../assets/app_logo_icon.png')} style={styles.logoImage} />
      <Text style={styles.logoText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0d1b2a',
  },
});
