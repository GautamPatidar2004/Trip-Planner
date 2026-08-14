import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Login } from './src/pages/Login';
import { SignUp } from './src/pages/SignUp';
import { Dashboard } from './src/pages/Dashboard';
import { Profile } from './src/pages/Profile';
import { Trips } from './src/pages/Trips';
import { LocalSpots } from './src/pages/LocalSpots';
import { AIPage } from './src/pages/AIPage';
import { SplashScreen } from './src/pages/SplashScreen';
import { Onboarding } from './src/pages/Onboarding';
import { Holidays } from './src/pages/Holidays';
import { Hotspots } from './src/pages/Hotspots';
import { SeasonSpots } from './src/pages/SeasonSpots';
import { NatureEscapes } from './src/pages/NatureEscapes';
import { RomanticGetaways } from './src/pages/RomanticGetaways';
import { FamilyFavorites } from './src/pages/FamilyFavorites';
import { ExploreMap } from './src/pages/ExploreMap';
import { supabase } from './src/lib/supabase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // Fake delay to show off the beautiful splash screen
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Profile':
        return <Profile session={session} onNavigate={setActiveTab} />;
      case 'Trips':
        return <Trips session={session} onNavigate={setActiveTab} />;
      case 'Local Spots':
        return <LocalSpots session={session} onNavigate={setActiveTab} />;
      case 'Hotspots':
        return <Hotspots session={session} onNavigate={setActiveTab} />;
      case 'SeasonSpots':
        return <SeasonSpots session={session} onNavigate={setActiveTab} />;
      case 'NatureEscapes':
        return <NatureEscapes session={session} onNavigate={setActiveTab} />;
      case 'RomanticGetaways':
        return <RomanticGetaways session={session} onNavigate={setActiveTab} />;
      case 'FamilyFavorites':
        return <FamilyFavorites session={session} onNavigate={setActiveTab} />;
      case 'ExploreMap':
        return <ExploreMap session={session} onNavigate={setActiveTab} />;
      case 'Holidays':
        return <Holidays session={session} onNavigate={setActiveTab} />;
      case 'Trip Planner AI':
        return <AIPage session={session} onNavigate={setActiveTab} />;
      case 'Dashboard':
      default:
        return <Dashboard session={session} onNavigate={setActiveTab} />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {session ? (
        renderActiveTab()
      ) : showOnboarding ? (
        <Onboarding onFinish={() => setShowOnboarding(false)} />
      ) : currentScreen === 'login' ? (
        <Login onNavigateToSignUp={() => setCurrentScreen('signup')} />
      ) : (
        <SignUp onNavigateToLogin={() => setCurrentScreen('login')} />
      )}
    </SafeAreaProvider>
  );
}
