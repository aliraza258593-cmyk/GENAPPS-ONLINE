import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, getSubscription, upsertSubscription } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscription, setSubscription] = useState({ plan: null, status: null });

    /* ─── Load subscription from Supabase (with localStorage fallback) ─── */
    const loadSubscription = useCallback(async (userId) => {
        if (!userId) return;
        const sub = await getSubscription(userId);
        setSubscription(sub);
    }, []);

    /* ─── Session listener ─── */
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                loadSubscription(currentUser.id);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                if (currentUser) {
                    loadSubscription(currentUser.id);
                } else {
                    setSubscription({ plan: null, status: null });
                    localStorage.removeItem('genapps_subscription');
                }
            }
        );

        return () => authSub.unsubscribe();
    }, [loadSubscription]);

    /* ─── Update subscription (called from CheckoutSuccess or webhook handler) ─── */
    const updateSubscription = useCallback(async (subData) => {
        setSubscription(subData);

        // Persist to Supabase
        if (user?.id) {
            await upsertSubscription(user.id, subData);
        } else {
            // Fallback to localStorage only
            localStorage.setItem('genapps_subscription', JSON.stringify(subData));
        }
    }, [user]);

    /* ─── Sign out ─── */
    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSubscription({ plan: null, status: null });
        localStorage.removeItem('genapps_subscription');
        localStorage.removeItem('genapps_history');
    }, []);

    const value = {
        user,
        loading,
        subscription,
        isAuthenticated: !!user,
        updateSubscription,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
