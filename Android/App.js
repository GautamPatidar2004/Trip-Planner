import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Login } from './src/pages/Login';
import { SignUp } from './src/pages/SignUp';
import { Dashboard } from './src/pages/Dashboard';
import { supabase } from './src/lib/supabase';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    // You could render a splash/loading indicator here
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {session ? (
        <Dashboard session={session} />
      ) : currentScreen === 'login' ? (
        <Login onNavigateToSignUp={() => setCurrentScreen('signup')} />
      ) : (
        <SignUp onNavigateToLogin={() => setCurrentScreen('login')} />
      )}
    </SafeAreaProvider>
  );
}
