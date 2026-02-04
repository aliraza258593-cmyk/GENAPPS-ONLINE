/**
 * Streaming XML Parser for Bolt-style AI responses
 * Parses <boltArtifact> and <boltAction> tags in real-time
 */

export interface ParsedFile {
    filePath: string;
    content: string;
}

export interface ParsedCommand {
    command: string;
}

export interface ParserCallbacks {
    onFile?: (file: ParsedFile) => void;
    onShell?: (cmd: ParsedCommand) => void;
    onChunk?: (text: string) => void;
    onComplete?: () => void;
    onError?: (error: Error) => void;
}

/**
 * Stream parser for bolt-style XML responses
 */
export class BoltStreamParser {
    private buffer: string = '';
    private callbacks: ParserCallbacks;
    private isComplete: boolean = false;

    constructor(callbacks: ParserCallbacks) {
        this.callbacks = callbacks;
    }

    /**
     * Process a chunk of streamed text
     */
    processChunk(chunk: string): void {
        this.buffer += chunk;
        this.callbacks.onChunk?.(chunk);
        this.parseBuffer();
    }

    /**
     * Parse the current buffer for complete tags
     */
    private parseBuffer(): void {
        // Look for complete <boltAction> tags
        const fileRegex = /<boltAction\s+type="file"\s+filePath="([^"]+)">([\s\S]*?)<\/boltAction>/g;
        const shellRegex = /<boltAction\s+type="shell">([\s\S]*?)<\/boltAction>/g;

        // Extract and emit file actions
        let match;
        while ((match = fileRegex.exec(this.buffer)) !== null) {
            const filePath = match[1];
            const content = this.cleanContent(match[2]);

            this.callbacks.onFile?.({ filePath, content });

            // Remove processed content from buffer
            this.buffer = this.buffer.replace(match[0], '<!-- PROCESSED -->');
        }

        // Extract and emit shell actions
        while ((match = shellRegex.exec(this.buffer)) !== null) {
            const command = match[1].trim();

            this.callbacks.onShell?.({ command });

            // Remove processed content from buffer
            this.buffer = this.buffer.replace(match[0], '<!-- PROCESSED -->');
        }

        // Check for artifact completion
        if (this.buffer.includes('</boltArtifact>') && !this.isComplete) {
            this.isComplete = true;
            this.callbacks.onComplete?.();
        }
    }

    /**
     * Clean up content (remove leading/trailing whitespace, handle escapes)
     */
    private cleanContent(content: string): string {
        return content
            .replace(/^\n/, '')  // Remove leading newline
            .replace(/\n$/, '')  // Remove trailing newline
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"');
    }

    /**
     * Finalize parsing
     */
    complete(): void {
        if (!this.isComplete) {
            this.isComplete = true;
            this.callbacks.onComplete?.();
        }
    }

    /**
     * Get current buffer for debugging
     */
    getBuffer(): string {
        return this.buffer;
    }
}

/**
 * Parse a complete string (non-streaming)
 */
export function parseArtifact(response: string): { files: ParsedFile[]; commands: ParsedCommand[] } {
    const files: ParsedFile[] = [];
    const commands: ParsedCommand[] = [];

    const parser = new BoltStreamParser({
        onFile: (file) => files.push(file),
        onShell: (cmd) => commands.push(cmd)
    });

    parser.processChunk(response);
    parser.complete();

    return { files, commands };
}

/**
 * System prompt for LongCat API to output structured XML
 */
export const BOLT_SYSTEM_PROMPT = `
You are an expert Full-Stack Developer built into a web IDE called GenApps.
Your goal is to build working, production-ready web applications.

**CRITICAL RULES:**

1. **Response Format:** You MUST use XML tags so the parser can read your code.
   - Wrap the entire response in: <boltArtifact id="project" title="Generated App">...</boltArtifact>
   - Wrap each file in: <boltAction type="file" filePath="path/to/file.ext">...CODE...</boltAction>
   - For shell commands: <boltAction type="shell">npm install package-name</boltAction>

2. **Technology Stack:**
   - Use React + Vite + Tailwind CSS
   - No Python, no Docker, no external backends
   - Everything runs in the browser via WebContainers

3. **Completeness:**
   - Write COMPLETE code - no placeholders like "// ...rest of code"
   - Include all imports at the top of each file
   - Make sure the app compiles and runs

4. **File Structure:**
   - package.json (with all dependencies)
   - vite.config.js
   - index.html
   - src/main.jsx
   - src/App.jsx
   - Additional components in src/components/

5. **Design Quality:**
   - Use Tailwind CSS for stunning UI
   - Dark themes with gradients
   - Smooth animations and transitions
   - Modern, professional design

**Example Response Format:**

<boltArtifact id="project" title="My App">
<boltAction type="file" filePath="package.json">
{
  "name": "my-app",
  "scripts": { "dev": "vite" },
  "dependencies": { "react": "^18.2.0" }
}
</boltAction>
<boltAction type="file" filePath="src/App.jsx">
import React from 'react';
export default function App() {
  return <div>Hello World</div>;
}
</boltAction>
<boltAction type="shell">npm install</boltAction>
</boltArtifact>
`;

/**
 * Create a streaming fetch request to the AI API
 */
export async function streamAIResponse(
    apiUrl: string,
    prompt: string,
    token: string,
    callbacks: ParserCallbacks
): Promise<void> {
    const parser = new BoltStreamParser(callbacks);

    try {
        // Google Gemini API Format
        // contents is the standard format for Google AI Studio
        // prompt argument from ChatInterface comes as a string (system + history)
        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Key is usually passed in query param for Google AI, headers for others
                // 'Authorization': \`Bearer \${token}\` 
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

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
            parser.processChunk(chunk);
        }
    } catch (error) {
        callbacks.onError?.(error as Error);
    }
}
