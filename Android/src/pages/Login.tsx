import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { CustomInput } from '../components/Input';
import { CustomButton } from '../components/Button';
import { GoogleIcon } from '../components/Illustrations';
import { supabase } from '../lib/supabase';

const { height } = Dimensions.get('window');

interface LoginProps {
  onNavigateToSignUp: () => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login pressed');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground
        source={require('../../assets/mountain.jpg')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Top navigation back button */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
              <Feather name="chevron-left" size={24} color="#191c1e" />
            </TouchableOpacity>
          </View>

          {/* Header Title and Subtitle */}
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Welcome Back</Text>
              <MaterialIcons name="flight" size={28} color="#005ab5" style={styles.planeIcon} />
            </View>
            <Text style={styles.subtitle}>
              Login to your account and start your next adventure
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Bottom Sheet Card */}
      <View style={styles.bottomCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.form}>
            {/* Email Address */}
            <CustomInput
              iconName="mail"
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoComplete="email"
            />

            {/* Password */}
            <CustomInput
              iconName="lock"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              autoComplete="password"
            />

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordContainer} activeOpacity={0.7}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <View style={styles.buttonSpacing}>
              <CustomButton title="Login" onPress={handleLogin} loading={loading} />
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google Login Button */}
            <CustomButton
              title="Continue with Google"
              variant="google"
              icon={<GoogleIcon size={20} />}
              onPress={handleGoogleLogin}
            />

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>New here? </Text>
              <TouchableOpacity onPress={onNavigateToSignUp} activeOpacity={0.7}>
                <Text style={styles.footerLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Cityscape Vector Art decoration */}
        <Image
          source={require('../../assets/cityscape.png')}
          style={styles.cityscape}
          resizeMode="contain"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fb',
  },
  headerBackground: {
    height: height * 0.4,
    width: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 12 : 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#191c1e',
  },
  planeIcon: {
    marginLeft: 8,
    transform: [{ rotate: '45deg' }],
  },
  subtitle: {
    fontSize: 16,
    color: '#424752',
    lineHeight: 24,
    maxWidth: 280,
  },
  bottomCard: {
    flex: 1,
    marginTop: -32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingHorizontal: 24,
    paddingTop: 24,
    shadowColor: '#3478d7',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80, // Space for the cityscape and safe areas
  },
  form: {
    flex: 1,
    marginTop: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#005ab5',
  },
  buttonSpacing: {
    marginVertical: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(194, 198, 212, 0.5)',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: '600',
    color: '#566069',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#424752',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#005ab5',
  },
  cityscape: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    width: '100%',
    opacity: 0.1,
  },
});
