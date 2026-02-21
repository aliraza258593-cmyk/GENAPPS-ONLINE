import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ═══════════════════════════════════════════════
   Subscription helpers
   ═══════════════════════════════════════════════ */

/**
 * Fetch the current user's subscription from the DB.
 * Falls back to localStorage cache if the table doesn't exist yet.
 */
export async function getSubscription(userId) {
    try {
        const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .maybeSingle();

        if (error) throw error;

        if (data) {
            const sub = {
                plan: data.plan,
                status: data.status,
                lemonSqueezyId: data.lemon_squeezy_id,
                currentPeriodEnd: data.current_period_end,
            };
            // Keep localStorage as a fast-read cache
            localStorage.setItem('genapps_subscription', JSON.stringify(sub));
            return sub;
        }

        return { plan: null, status: null };
    } catch {
        // Table may not exist yet – gracefully fall back to localStorage
        const cached = localStorage.getItem('genapps_subscription');
        if (cached) {
            try { return JSON.parse(cached); } catch { /* ignore */ }
        }
        return { plan: null, status: null };
    }
}

/**
 * Upsert a subscription row for the current user.
 */
export async function upsertSubscription(userId, subscriptionData) {
    try {
        const { error } = await supabase
            .from('subscriptions')
            .upsert({
                user_id: userId,
                plan: subscriptionData.plan,
                status: subscriptionData.status || 'active',
                lemon_squeezy_id: subscriptionData.lemonSqueezyId || null,
                current_period_end: subscriptionData.currentPeriodEnd || null,
                updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id' });

        if (error) throw error;

        // Update cache
        localStorage.setItem('genapps_subscription', JSON.stringify(subscriptionData));
        return true;
    } catch {
        // Fallback – just use localStorage
        localStorage.setItem('genapps_subscription', JSON.stringify(subscriptionData));
        return false;
    }
}


/* ═══════════════════════════════════════════════
   Generation history helpers
   ═══════════════════════════════════════════════ */

/**
 * Save a generation to the database.
 */
export async function saveGeneration(userId, generation) {
    try {
        const { error } = await supabase
            .from('generations')
            .insert({
                user_id: userId,
                prompt: generation.prompt,
                template: generation.template,
                color_style: generation.color,
                ai_model: generation.model,
                build_type: generation.buildType || 'web',
                html_output: generation.html || null,
            });

        if (error) throw error;
        return true;
    } catch {
        // Fallback – update localStorage history
        const history = JSON.parse(localStorage.getItem('genapps_history') || '[]');
        history.unshift({
            ...generation,
            date: new Date().toLocaleDateString(),
        });
        localStorage.setItem('genapps_history', JSON.stringify(history));
        return false;
    }
}

/**
 * Fetch generation history for a user.
 */
export async function getGenerations(userId, limit = 50) {
    try {
        const { data, error } = await supabase
            .from('generations')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;

        return (data || []).map(row => ({
            id: row.id,
            prompt: row.prompt,
            template: row.template,
            color: row.color_style,
            model: row.ai_model,
            buildType: row.build_type,
            date: new Date(row.created_at).toLocaleDateString(),
            createdAt: row.created_at,
        }));
    } catch {
        // Fallback
        const stored = localStorage.getItem('genapps_history');
        if (stored) {
            try { return JSON.parse(stored); } catch { /* ignore */ }
        }
        return [];
    }
}

/**
 * Delete a generation by ID.
 */
export async function deleteGeneration(generationId) {
    try {
        const { error } = await supabase
            .from('generations')
            .delete()
            .eq('id', generationId);

        if (error) throw error;
        return true;
    } catch {
        return false;
    }
}

/**
 * Get total generation count for a user.
 */
export async function getGenerationCount(userId) {
    try {
        const { count, error } = await supabase
            .from('generations')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (error) throw error;
        return count || 0;
    } catch {
        const stored = localStorage.getItem('genapps_history');
        if (stored) {
            try { return JSON.parse(stored).length; } catch { /* ignore */ }
        }
        return 0;
    }
}
