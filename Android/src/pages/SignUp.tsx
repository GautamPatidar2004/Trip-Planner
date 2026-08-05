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

interface SignUpProps {
  onNavigateToLogin: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onNavigateToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    setLoading(false);
    if (error) {
      Alert.alert('Registration Error', error.message);
    } else {
      Alert.alert(
        'Success',
        'Registration successful! Please check your email for confirmation.'
      );
      onNavigateToLogin();
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
        source={require('../../assets/beach.jpg')}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Top navigation back button */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onNavigateToLogin} style={styles.backButton} activeOpacity={0.7}>
              <Feather name="chevron-left" size={24} color="#191c1e" />
            </TouchableOpacity>
          </View>

          {/* Header Title and Subtitle */}
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create Account</Text>
              <MaterialIcons name="flight" size={28} color="#ffffff" style={styles.planeIcon} />
            </View>
            <Text style={styles.subtitle}>
              Sign up and let AI plan your perfect trip
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
            {/* Google Login Button at top */}
            <CustomButton
              title="Continue with Google"
              variant="google"
              icon={<GoogleIcon size={20} />}
              onPress={handleGoogleLogin}
            />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Full Name */}
            <CustomInput
              iconName="user"
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

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

            {/* Sign Up Button */}
            <View style={styles.buttonSpacing}>
              <CustomButton title="Sign Up" onPress={handleSignUp} loading={loading} />
            </View>

            {/* Terms and Privacy Policy */}
            <View style={styles.termsContainer}>
              <MaterialIcons name="verified-user" size={18} color="#005ab5" style={styles.termsIcon} />
              <Text style={styles.termsText}>
                By signing up, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Cityscape Vector Art decoration */}
        <Image
          source={require('../../assets/cityscape_signup.png')}
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
    height: height * 0.43,
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
    paddingBottom: 45,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  planeIcon: {
    marginLeft: 8,
    transform: [{ rotate: '45deg' }],
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 24,
    maxWidth: 250,
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
  buttonSpacing: {
    marginVertical: 8,
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  termsIcon: {
    marginTop: 2,
    marginRight: 6,
  },
  termsText: {
    fontSize: 13,
    color: '#566069',
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 260,
  },
  termsLink: {
    fontWeight: '500',
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
