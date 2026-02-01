import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authenticateToken } from '../middleware/auth.js';
import { generateWebsite, COSMETIC_MODELS } from '../services/aiService.js';
import { consumeCredits, getCredits } from '../services/creditService.js';
import { prepare } from '../db/database.js';

const router = Router();

router.get('/models', (req, res) => {
    res.json({ models: COSMETIC_MODELS });
});

router.post('/', authenticateToken, async (req, res) => {
    try {
        const { prompt, model, deepThinking = false } = req.body;
        const user = req.user;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const creditResult = consumeCredits(user.id, 5);

        if (!creditResult.success) {
            return res.status(403).json({
                error: 'Insufficient credits',
                remaining: creditResult.remaining,
                upgradeRequired: true
            });
        }

        const isPremium = user.plan !== 'free';
        const useDeepThinking = isPremium && deepThinking;

        const result = await generateWebsite(prompt, user.plan, useDeepThinking);

        if (!result.success) {
            prepare(`INSERT INTO usage_logs (id, user_id, action, model_used, credits_consumed, success, error_message) VALUES (?, ?, 'generate', ?, 5, 0, ?)`)
                .run(uuidv4(), user.id, result.model || 'unknown', result.error);

            return res.status(500).json({
                error: 'Generation failed',
                details: result.error
            });
        }

        prepare(`INSERT INTO usage_logs (id, user_id, action, model_used, credits_consumed, api_key_used, success) VALUES (?, ?, 'generate', ?, 5, ?, 1)`)
            .run(uuidv4(), user.id, result.model, result.keyUsed);

        const creditsInfo = getCredits(user.id);

        res.json({
            success: true,
            code: result.content,
            credits: creditsInfo,
            watermark: user.plan === 'free'
        });
    } catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ error: 'Generation failed' });
    }
});

export default router;
