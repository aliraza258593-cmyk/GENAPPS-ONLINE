import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getCredits, checkAndResetCredits } from '../services/creditService.js';
import { prepare } from '../db/database.js';

const router = Router();

router.get('/profile', authenticateToken, (req, res) => {
    const user = req.user;
    checkAndResetCredits(user);

    const refreshedUser = prepare('SELECT id, email, name, plan, credits FROM users WHERE id = ?').get(user.id);

    res.json({
        user: refreshedUser,
        credits: getCredits(user.id)
    });
});

router.get('/credits', authenticateToken, (req, res) => {
    const credits = getCredits(req.user.id);
    res.json(credits);
});

router.post('/upgrade', authenticateToken, (req, res) => {
    const { plan } = req.body;

    if (!['pro', 'plus'].includes(plan)) {
        return res.status(400).json({ error: 'Invalid plan' });
    }

    prepare('UPDATE users SET plan = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(plan, req.user.id);

    res.json({ success: true, plan });
});

router.get('/usage', authenticateToken, (req, res) => {
    const logs = prepare(`
    SELECT action, model_used, credits_consumed, success, created_at
    FROM usage_logs
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 50
  `).all(req.user.id);

    res.json({ logs });
});

export default router;
