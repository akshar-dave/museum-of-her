import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        // Clear hugged notes from localStorage when user signs out
        if (event === 'SIGNED_OUT') {
          localStorage.removeItem('huggedNotes');
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInAnonymously = async (turnstileToken) => {
    try {
      setLoading(true);
      
      // Sign in anonymously with Turnstile token for captcha verification
      const { data, error } = await supabase.auth.signInAnonymously({
        options: {
          captchaToken: turnstileToken
        }
      });

      if (error) {
        console.error('Error signing in anonymously:', error);
        throw error;
      }

      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Error during anonymous sign-in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      setUser(null);
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signInAnonymously,
    signOut,
    isAuthenticated: !!user
  };
} 