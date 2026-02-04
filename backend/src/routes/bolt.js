/**
 * Bolt-style Generation Route
 * Returns structured XML with file paths for WebContainer mounting
 */

import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import db from '../../db/database.js';

const router = express.Router();

const API_KEYS = [
    process.env.API_KEY_1,
    process.env.API_KEY_2,
    process.env.API_KEY_3,
    process.env.API_KEY_4,
    process.env.API_KEY_5,
    process.env.API_KEY_6
].filter(Boolean);

const API_ENDPOINT = 'https://api.longcat.chat/openai/v1/chat/completions';

const BOLT_SYSTEM_PROMPT = `
You are an expert Full-Stack Developer built into a web IDE called GenApps.
Your goal is to build working, production-ready web applications.

**CRITICAL RULES:**

1. **Response Format:** You MUST use XML tags so the parser can read your code.
   - Wrap the entire response in: <boltArtifact id="project" title="Generated App">...</boltArtifact>
   - Wrap each file in: <boltAction type="file" filePath="path/to/file.ext">...CODE...</boltAction>
   - For shell commands: <boltAction type="shell">npm install</boltAction>

2. **Technology Stack:**
   - Use React + Vite + Tailwind CSS (via CDN script tag)
   - Write JSX files (not TSX)
   - No TypeScript, no Python, no Docker
   - Everything runs in the browser via WebContainers

3. **Completeness:**
   - Write COMPLETE code - no placeholders like "// ...rest of code"
   - Include all imports at the top of each file
   - Make sure the app compiles and runs

4. **Required Files:**
   - package.json (with dependencies: react, react-dom, vite, @vitejs/plugin-react)
   - vite.config.js (with react plugin)
   - index.html (with Tailwind CDN script and root div)
   - src/main.jsx (ReactDOM.createRoot render)
   - src/App.jsx (main component)

5. **Design Quality:**
   - Use Tailwind CSS classes for stunning UI
   - Dark themes with purple/pink gradients
   - Smooth hover effects and transitions
   - Modern, professional design like Apple/Stripe

6. **Functionality:**
   - All buttons must have click handlers
   - Forms must have state management with useState
   - Mobile menu with toggle functionality
   - Smooth scroll for navigation links

**EXAMPLE OUTPUT FORMAT:**

<boltArtifact id="project" title="My SaaS App">
<boltAction type="file" filePath="package.json">
{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  }
}
</boltAction>
<boltAction type="file" filePath="vite.config.js">
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: true }
});
</boltAction>
<boltAction type="file" filePath="index.html">
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
</boltAction>
<boltAction type="file" filePath="src/main.jsx">
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
</boltAction>
<boltAction type="file" filePath="src/App.jsx">
import React, { useState } from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <h1>Hello World</h1>
    </div>
  );
}
</boltAction>
<boltAction type="shell">npm install</boltAction>
</boltArtifact>

NOW BUILD THE USER'S REQUEST:
`;

async function generateWithKey(prompt, model, apiKey) {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: BOLT_SYSTEM_PROMPT },
                { role: 'user', content: prompt }
            ],
            max_tokens: 16000,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`API Error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// Bolt-style generation endpoint
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { prompt, model = 'gemini-flash' } = req.body;
        const user = req.user;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Check credits
        if (user.credits <= 0) {
            return res.status(403).json({ error: 'No credits remaining' });
        }

        // Consume credit
        db.prepare('UPDATE users SET credits = credits - 1 WHERE id = ?').run(user.id);

        // Select model
        const modelMap = {
            'gemini-flash': 'LongCat-Flash-Chat',
            'gpt-4o': 'LongCat-Flash-Thinking',
            'claude-3.5': 'LongCat-Flash-Thinking-2601'
        };
        const selectedModel = modelMap[model] || 'LongCat-Flash-Chat';

        // Try each API key
        let lastError = null;
        for (const apiKey of API_KEYS) {
            try {
                const content = await generateWithKey(prompt, selectedModel, apiKey);

                // Log usage
                db.prepare(`
                    INSERT INTO usage_logs (user_id, prompt, model, timestamp)
                    VALUES (?, ?, ?, datetime('now'))
                `).run(user.id, prompt.substring(0, 500), selectedModel);

                return res.json({
                    success: true,
                    content: content,
                    credits: user.credits - 1
                });
            } catch (error) {
                lastError = error;
                continue;
            }
        }

        throw lastError || new Error('All API keys exhausted');

    } catch (error) {
        console.error('Bolt generation error:', error);
        res.status(500).json({ error: 'Generation failed: ' + error.message });
    }
});

// Streaming endpoint
router.post('/stream', authenticateToken, async (req, res) => {
    try {
        const { prompt, model = 'gemini-flash' } = req.body;
        const user = req.user;

        if (!prompt || user.credits <= 0) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        // Consume credit
        db.prepare('UPDATE users SET credits = credits - 1 WHERE id = ?').run(user.id);

        const modelMap = {
            'gemini-flash': 'LongCat-Flash-Chat',
            'gpt-4o': 'LongCat-Flash-Thinking',
            'claude-3.5': 'LongCat-Flash-Thinking-2601'
        };
        const selectedModel = modelMap[model] || 'LongCat-Flash-Chat';

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        for (const apiKey of API_KEYS) {
            try {
                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: selectedModel,
                        messages: [
                            { role: 'system', content: BOLT_SYSTEM_PROMPT },
                            { role: 'user', content: prompt }
                        ],
                        max_tokens: 16000,
                        temperature: 0.7,
                        stream: true
                    })
                });

                if (!response.ok) continue;

                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
                }

                res.write('data: [DONE]\n\n');
                res.end();
                return;

            } catch (error) {
                continue;
            }
        }

        res.write('data: {"error": "Generation failed"}\n\n');
        res.end();

    } catch (error) {
        console.error('Stream error:', error);
        res.status(500).json({ error: 'Stream failed' });
    }
});

export default router;
