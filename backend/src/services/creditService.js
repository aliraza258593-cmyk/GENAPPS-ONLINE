import { prepare, saveDb } from '../db/database.js';

const DAILY_FREE_CREDITS = 5;

export const checkAndResetCredits = (user) => {
    if (user.plan !== 'free') return user;

    const today = new Date().toISOString().split('T')[0];
    const resetDate = user.credits_reset_date;

    if (!resetDate || resetDate !== today) {
        prepare('UPDATE users SET credits = ?, credits_reset_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
            .run(DAILY_FREE_CREDITS, today, user.id);
        user.credits = DAILY_FREE_CREDITS;
        user.credits_reset_date = today;
    }

    return user;
};

export const consumeCredits = (userId, amount = 5) => {
    const user = prepare('SELECT * FROM users WHERE id = ?').get(userId);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.plan !== 'free') {
        return { success: true, remaining: -1, unlimited: true };
    }

    const updatedUser = checkAndResetCredits(user);

    if (updatedUser.credits < amount) {
        return { success: false, remaining: updatedUser.credits, error: 'Insufficient credits' };
    }

    const newCredits = updatedUser.credits - amount;
    prepare('UPDATE users SET credits = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(newCredits, userId);

    return { success: true, remaining: newCredits };
};

export const getCredits = (userId) => {
    const user = prepare('SELECT id, plan, credits, credits_reset_date FROM users WHERE id = ?').get(userId);

    if (!user) {
        throw new Error('User not found');
    }

    if (user.plan !== 'free') {
        return { credits: -1, unlimited: true, plan: user.plan };
    }

    const updatedUser = checkAndResetCredits(user);
    return { credits: updatedUser.credits, unlimited: false, plan: 'free' };
};

export const logUsage = (userId, action, modelUsed, creditsConsumed, apiKeyUsed, success, errorMessage = null) => {
    const { v4: uuidv4 } = require('uuid');
    prepare(`
    INSERT INTO usage_logs (id, user_id, action, model_used, credits_consumed, api_key_used, success, error_message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(uuidv4(), userId, action, modelUsed, creditsConsumed, apiKeyUsed, success ? 1 : 0, errorMessage);
};
