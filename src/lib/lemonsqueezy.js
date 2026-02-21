// Lemon Squeezy Payment Integration
// Uses Lemon Squeezy's hosted checkout overlay — no backend needed
// Syncs subscription status with Supabase for persistence

import { upsertSubscription } from './supabase';

const STORE_ID = import.meta.env.VITE_LEMONSQUEEZY_STORE_ID || 'your-store-id';

// Map plan names to Lemon Squeezy variant IDs
const VARIANT_IDS = {
    starter_monthly: import.meta.env.VITE_LS_STARTER_MONTHLY,
    pro_monthly: import.meta.env.VITE_LS_PRO_MONTHLY,
    business_monthly: import.meta.env.VITE_LS_BUSINESS_MONTHLY,
};

/**
 * Check if running in demo mode (variant IDs are placeholders)
 */
export function isDemoMode() {
    return Object.values(VARIANT_IDS).some(v => !v || v.startsWith('variant-'));
}

let lemonSqueezyLoaded = false;

/**
 * Load the Lemon Squeezy JS script dynamically
 */
export function loadLemonSqueezy() {
    return new Promise((resolve, reject) => {
        if (lemonSqueezyLoaded || window.createLemonSqueezy) {
            lemonSqueezyLoaded = true;
            if (window.createLemonSqueezy) window.createLemonSqueezy();
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
        script.defer = true;
        script.onload = () => {
            lemonSqueezyLoaded = true;
            if (window.createLemonSqueezy) window.createLemonSqueezy();
            resolve();
        };
        script.onerror = () => {
            console.warn('[LemonSqueezy] Failed to load checkout script');
            reject(new Error('Failed to load Lemon Squeezy script'));
        };
        document.head.appendChild(script);
    });
}

/**
 * Get variant ID for a plan
 */
export function getVariantId(planName, isAnnual) {
    const period = isAnnual ? 'annual' : 'monthly';
    const key = `${planName.toLowerCase()}_${period}`;
    return VARIANT_IDS[key] || null;
}

/**
 * Build checkout URL for Lemon Squeezy overlay
 */
export function getCheckoutUrl(variantId, options = {}) {
    const params = new URLSearchParams();

    if (options.email) params.set('checkout[email]', options.email);
    if (options.name) params.set('checkout[name]', options.name);
    if (options.userId) params.set('checkout[custom][user_id]', options.userId);
    if (options.plan) params.set('checkout[custom][plan]', options.plan);

    // Embed mode for overlay
    params.set('embed', '1');

    // Success/cancel URLs
    const baseUrl = window.location.origin;
    params.set('checkout[success_url]', `${baseUrl}/checkout/success`);
    params.set('checkout[custom][cancel_url]', `${baseUrl}/checkout/cancel`);

    const queryString = params.toString();
    return `https://${STORE_ID}.lemonsqueezy.com/checkout/buy/${variantId}?${queryString}`;
}

/**
 * Open Lemon Squeezy checkout overlay
 */
export async function openCheckout(planName, isAnnual, userInfo = {}) {
    const variantId = getVariantId(planName, isAnnual);

    if (!variantId || variantId.startsWith('variant-')) {
        // Demo/placeholder mode — return info for UI to display
        return {
            demo: true,
            plan: planName,
            period: isAnnual ? 'annual' : 'monthly',
            message: 'Payment is in demo mode. Configure Lemon Squeezy variant IDs in .env to enable real payments.',
        };
    }

    try {
        await loadLemonSqueezy();
    } catch {
        // Fallback to redirect if script fails to load
        const url = getCheckoutUrl(variantId, {
            ...userInfo,
            plan: planName,
        });
        window.open(url, '_blank', 'width=480,height=720');
        return { demo: false, plan: planName, fallback: true };
    }

    const url = getCheckoutUrl(variantId, {
        ...userInfo,
        plan: planName,
    });

    // Use Lemon Squeezy overlay if available
    if (window.LemonSqueezy) {
        window.LemonSqueezy.Url.Open(url);
    } else {
        // Fallback: open in new window
        window.open(url, '_blank', 'width=480,height=720');
    }

    return { demo: false, plan: planName };
}

/**
 * Initialize Lemon Squeezy event listeners
 * Syncs checkout success to Supabase for persistence
 */
export function initLemonSqueezy(onSuccess) {
    if (typeof window === 'undefined') return;

    window.addEventListener('message', async (event) => {
        if (event.origin !== 'https://app.lemonsqueezy.com') return;

        try {
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            if (data.event === 'Checkout.Success') {
                // Extract plan info from checkout custom data
                const customData = data.meta?.custom_data || {};
                const userId = customData.user_id;
                const plan = customData.plan;

                // Sync to Supabase if we have user context
                if (userId && plan) {
                    await upsertSubscription(userId, {
                        plan,
                        status: 'active',
                        lemonSqueezyId: data.order?.id || data.subscription_id || null,
                        currentPeriodEnd: null, // Will be set by webhook in production
                    });
                }

                onSuccess?.(data);
            }
        } catch {
            // ignore non-JSON messages
        }
    });
}
