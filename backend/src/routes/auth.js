import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { prepare } from '../db/database.js';

const router = Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const existingUser = prepare('SELECT id FROM users WHERE email = ?').get(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const today = new Date().toISOString().split('T')[0];

        prepare(`INSERT INTO users (id, email, password, name, plan, credits, credits_reset_date) VALUES (?, ?, ?, ?, 'free', 5, ?)`)
            .run(userId, email, hashedPassword, name || email.split('@')[0], today);

        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: {
                id: userId,
                email,
                name: name || email.split('@')[0],
                plan: 'free',
                credits: 5
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Signup failed' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const user = prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                plan: user.plan,
                credits: user.credits
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

router.post('/oauth/google', async (req, res) => {
    try {
        const { token: googleToken, email, name } = req.body;

        let user = prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            const userId = uuidv4();
            const today = new Date().toISOString().split('T')[0];

            prepare(`INSERT INTO users (id, email, name, plan, credits, credits_reset_date, oauth_provider, oauth_id) VALUES (?, ?, ?, 'free', 5, ?, 'google', ?)`)
                .run(userId, email, name, today, googleToken);

            user = { id: userId, email, name, plan: 'free', credits: 5 };
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                plan: user.plan,
                credits: user.credits
            }
        });
    } catch (error) {
        console.error('Google OAuth error:', error);
        res.status(500).json({ error: 'OAuth failed' });
    }
});

router.post('/oauth/github', async (req, res) => {
    try {
        const { code, email, name } = req.body;

        let user = prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            const userId = uuidv4();
            const today = new Date().toISOString().split('T')[0];

            prepare(`INSERT INTO users (id, email, name, plan, credits, credits_reset_date, oauth_provider, oauth_id) VALUES (?, ?, ?, 'free', 5, ?, 'github', ?)`)
                .run(userId, email, name, today, code);

            user = { id: userId, email, name, plan: 'free', credits: 5 };
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                plan: user.plan,
                credits: user.credits
            }
        });
    } catch (error) {
        console.error('GitHub OAuth error:', error);
        res.status(500).json({ error: 'OAuth failed' });
    }
});

router.get('/verify', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = prepare('SELECT id, email, name, plan, credits FROM users WHERE id = ?').get(decoded.userId);

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
});

export default router;
