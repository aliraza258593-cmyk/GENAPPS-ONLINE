/**
 * LongCat API Client
 * Handles AI generation with multiple API keys and model support
 */

// API Configuration
const LONGCAT_API_BASE = 'https://api.longcat.ai/v1';

// Model mapping - UI names to actual LongCat models
export const MODEL_MAPPING = {
    'gemini-3-flash': 'longcat-flash',      // Free tier
    'claude-opus-4.5': 'longcat-thinking',  // Premium
    'kimi-k2.5': 'longcat-thinking',        // Premium
    'gpt-5.2': 'longcat-thinking',          // Premium
    'deep-thinking': 'longcat-deep'         // Premium with toggle
} as const;

export type UIModelName = keyof typeof MODEL_MAPPING;
export type LongCatModel = 'longcat-flash' | 'longcat-thinking' | 'longcat-deep';

// UI Model definitions for the model selector
export const UI_MODELS = [
    {
        id: 'gemini-3-flash',
        name: 'Gemini 3 Flash',
        description: 'Fast and efficient for most tasks',
        icon: '⚡',
        premium: false,
        color: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'claude-opus-4.5',
        name: 'Claude Opus 4.5',
        description: 'Advanced reasoning and creativity',
        icon: '🧠',
        premium: true,
        color: 'from-orange-500 to-amber-500'
    },
    {
        id: 'kimi-k2.5',
        name: 'Kimi K2.5',
        description: 'Excellent for complex applications',
        icon: '🚀',
        premium: true,
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'gpt-5.2',
        name: 'GPT 5.2',
        description: 'State-of-the-art intelligence',
        icon: '✨',
        premium: true,
        color: 'from-green-500 to-emerald-500'
    }
] as const;

// API Keys from environment (in production these come from backend)
const API_KEYS = [
    'ak_2lC4nQ5Vf6Xw5oD6Ba14y5HM6lQ9h',
    'ak_2IL4mb3xk1iC2IN4PH4Mz4wh9ZD1c',
    'ak_2ET4vK6t27ak6r32Sr8RL8mI10j4G',
    'ak_2UN3Dh9rM9Xw3oH7M93xP0rl9aT5R',
    'ak_2Ld4zD7UX2Dj0699YY5rH3m20lL5E',
    'ak_2UQ4Kk8g20ZQ8gr6D35AM6ht2eY1z'
];

let currentKeyIndex = 0;

/**
 * Get the next API key (round-robin rotation)
 */
function getNextApiKey(): string {
    const key = API_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    return key;
}

/**
 * System prompt for website generation
 */
export const WEBSITE_SYSTEM_PROMPT = `You are GenApps AI, an expert web developer that creates stunning, production-ready websites.

**CRITICAL RULES:**

1. **Response Format:** Output valid XML with boltArtifact and boltAction tags:
   - Wrap everything in: <boltArtifact id="project" title="Generated App">...</boltArtifact>
   - Each file: <boltAction type="file" filePath="path/to/file.ext">CODE</boltAction>
   - Shell commands: <boltAction type="shell">npm install</boltAction>

2. **Technology Stack:**
   - React + Vite + Tailwind CSS (via CDN script)
   - NO TypeScript, use .jsx files
   - NO backend, everything frontend only
   - Use localStorage for any data persistence

3. **Design Quality (CRITICAL):**
   - STUNNING, PREMIUM UI design
   - Dark mode with gradients and glassmorphism
   - Smooth animations and micro-interactions
   - Professional color schemes (violet, indigo, slate)
   - Modern typography and spacing
   - All buttons/menus must be interactive

4. **File Structure:**
   - package.json (minimal deps: react, react-dom)
   - vite.config.js
   - index.html (include Tailwind CDN)
   - src/main.jsx
   - src/App.jsx
   - src/components/*.jsx

5. **Completeness:**
   - Write COMPLETE, WORKING code
   - NO placeholders, NO "// TODO", NO "..."
   - Every button must have onClick handlers
   - Every menu must open/close
   - Add sample data so the app looks real

**Example Response:**
<boltArtifact id="project" title="My App">
<boltAction type="file" filePath="package.json">
{
  "name": "app",
  "scripts": { "dev": "vite" },
  "dependencies": { "react": "^18.2.0", "react-dom": "^18.2.0" },
  "devDependencies": { "@vitejs/plugin-react": "^4.0.0", "vite": "^5.0.0" }
}
</boltAction>
<boltAction type="file" filePath="src/App.jsx">
import React from 'react';
export default function App() {
  return <div className="min-h-screen bg-slate-950">Hello</div>;
}
</boltAction>
<boltAction type="shell">npm install</boltAction>
</boltArtifact>`;

export interface StreamCallbacks {
    onChunk?: (text: string) => void;
    onFile?: (path: string, content: string) => void;
    onCommand?: (command: string) => void;
    onProgress?: (percent: number, status: string) => void;
    onComplete?: () => void;
    onError?: (error: Error) => void;
}

/**
 * Parse streaming response for boltAction tags
 */
class ResponseParser {
    private buffer = '';
    private callbacks: StreamCallbacks;
    private filesWritten = 0;
    private totalEstimatedFiles = 6; // Estimate for progress

    constructor(callbacks: StreamCallbacks) {
        this.callbacks = callbacks;
    }

    process(chunk: string) {
        this.buffer += chunk;
        this.callbacks.onChunk?.(chunk);
        this.parseBuffer();
    }

    private parseBuffer() {
        // Parse file actions
        const fileRegex = /<boltAction\s+type="file"\s+filePath="([^"]+)">([\s\S]*?)<\/boltAction>/g;
        let match;

        while ((match = fileRegex.exec(this.buffer)) !== null) {
            const filePath = match[1];
            const content = this.cleanContent(match[2]);

            this.filesWritten++;
            const progress = Math.min(90, (this.filesWritten / this.totalEstimatedFiles) * 80 + 10);
            this.callbacks.onProgress?.(progress, `Creating ${filePath}...`);
            this.callbacks.onFile?.(filePath, content);

            // Mark as processed
            this.buffer = this.buffer.replace(match[0], '<!-- DONE -->');
        }

        // Parse shell commands
        const shellRegex = /<boltAction\s+type="shell">([\s\S]*?)<\/boltAction>/g;
        while ((match = shellRegex.exec(this.buffer)) !== null) {
            const command = match[1].trim();
            this.callbacks.onCommand?.(command);
            this.buffer = this.buffer.replace(match[0], '<!-- DONE -->');
        }
    }

    private cleanContent(content: string): string {
        return content
            .replace(/^\n/, '')
            .replace(/\n$/, '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"');
    }

    complete() {
        this.callbacks.onProgress?.(100, 'Complete!');
        this.callbacks.onComplete?.();
    }
}

/**
 * Stream AI response from LongCat API
 */
export async function streamGeneration(
    prompt: string,
    uiModel: UIModelName,
    deepThinking: boolean,
    callbacks: StreamCallbacks
): Promise<void> {
    // Determine actual model
    let actualModel: LongCatModel;
    if (deepThinking) {
        actualModel = 'longcat-deep';
    } else {
        actualModel = MODEL_MAPPING[uiModel];
    }

    const apiKey = getNextApiKey();
    const parser = new ResponseParser(callbacks);

    // Initial progress
    callbacks.onProgress?.(5, 'Analyzing your requirements...');

    try {
        const response = await fetch(`${LONGCAT_API_BASE}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: actualModel,
                messages: [
                    { role: 'system', content: WEBSITE_SYSTEM_PROMPT },
                    { role: 'user', content: prompt }
                ],
                stream: true,
                max_tokens: 16000,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            // Try next key on failure
            const nextKey = getNextApiKey();
            const retryResponse = await fetch(`${LONGCAT_API_BASE}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${nextKey}`
                },
                body: JSON.stringify({
                    model: actualModel,
                    messages: [
                        { role: 'system', content: WEBSITE_SYSTEM_PROMPT },
                        { role: 'user', content: prompt }
                    ],
                    stream: true,
                    max_tokens: 16000,
                    temperature: 0.7
                })
            });

            if (!retryResponse.ok) {
                throw new Error(`API Error: ${retryResponse.status}`);
            }
        }

        callbacks.onProgress?.(10, 'Generating your application...');

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
            throw new Error('No response body');
        }

        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                parser.complete();
                break;
            }

            const chunk = decoder.decode(value, { stream: true });

            // Parse SSE format
            const lines = chunk.split('\n');
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;

                    try {
                        const json = JSON.parse(data);
                        const content = json.choices?.[0]?.delta?.content || '';
                        if (content) {
                            parser.process(content);
                        }
                    } catch {
                        // Not valid JSON, might be partial
                    }
                }
            }
        }
    } catch (error) {
        callbacks.onError?.(error as Error);
    }
}

/**
 * Check if a model requires premium access
 */
export function isPremiumModel(modelId: UIModelName): boolean {
    return UI_MODELS.find(m => m.id === modelId)?.premium ?? false;
}

/**
 * Get model info by ID
 */
export function getModelInfo(modelId: UIModelName) {
    return UI_MODELS.find(m => m.id === modelId);
}
