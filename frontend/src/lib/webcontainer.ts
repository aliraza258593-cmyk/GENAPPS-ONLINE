/**
 * WebContainer Manager
 * Boots and manages a StackBlitz WebContainer for in-browser code execution
 */

import { WebContainer } from '@webcontainer/api';

// Singleton instance
let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;

export interface FileSystemTree {
    [name: string]: FileNode | DirectoryNode;
}

export interface FileNode {
    file: {
        contents: string;
    };
}

export interface DirectoryNode {
    directory: FileSystemTree;
}

export interface TerminalOutput {
    type: 'stdout' | 'stderr' | 'info';
    data: string;
}

export type TerminalCallback = (output: TerminalOutput) => void;
export type UrlCallback = (url: string) => void;

/**
 * Boot the WebContainer (singleton pattern)
 */
export async function bootWebContainer(): Promise<WebContainer> {
    if (webcontainerInstance) {
        return webcontainerInstance;
    }

    if (bootPromise) {
        return bootPromise;
    }

    bootPromise = WebContainer.boot();
    webcontainerInstance = await bootPromise;
    return webcontainerInstance;
}

/**
 * Get the current WebContainer instance
 */
export function getWebContainer(): WebContainer | null {
    return webcontainerInstance;
}

/**
 * Mount files to the WebContainer
 */
export async function mountFiles(files: FileSystemTree): Promise<void> {
    const container = await bootWebContainer();
    await container.mount(files);
}

/**
 * Write a single file to the WebContainer
 */
export async function writeFile(path: string, contents: string): Promise<void> {
    const container = await bootWebContainer();

    // Create directory structure if needed
    const parts = path.split('/');
    if (parts.length > 1) {
        const dir = parts.slice(0, -1).join('/');
        try {
            await container.fs.mkdir(dir, { recursive: true });
        } catch (e) {
            // Directory might already exist
        }
    }

    await container.fs.writeFile(path, contents);
}

/**
 * Read a file from the WebContainer
 */
export async function readFile(path: string): Promise<string> {
    const container = await bootWebContainer();
    return await container.fs.readFile(path, 'utf-8');
}

/**
 * Run a shell command in the WebContainer
 */
export async function runCommand(
    command: string,
    args: string[] = [],
    onOutput?: TerminalCallback
): Promise<number> {
    const container = await bootWebContainer();

    const process = await container.spawn(command, args);

    if (onOutput) {
        process.output.pipeTo(new WritableStream({
            write(data) {
                onOutput({ type: 'stdout', data });
            }
        }));
    }

    return process.exit;
}

/**
 * Install npm dependencies
 */
export async function installDependencies(onOutput?: TerminalCallback): Promise<boolean> {
    onOutput?.({ type: 'info', data: '📦 Installing dependencies...\n' });

    const exitCode = await runCommand('npm', ['install'], onOutput);

    if (exitCode === 0) {
        onOutput?.({ type: 'info', data: '✅ Dependencies installed!\n' });
        return true;
    } else {
        onOutput?.({ type: 'stderr', data: '❌ Failed to install dependencies\n' });
        return false;
    }
}

/**
 * Start the dev server and return the preview URL
 */
export async function startDevServer(
    onOutput?: TerminalCallback,
    onUrl?: UrlCallback
): Promise<void> {
    const container = await bootWebContainer();

    onOutput?.({ type: 'info', data: '🚀 Starting dev server...\n' });

    const process = await container.spawn('npm', ['run', 'dev']);

    process.output.pipeTo(new WritableStream({
        write(data) {
            onOutput?.({ type: 'stdout', data });
        }
    }));

    // Listen for server-ready event
    container.on('server-ready', (port, url) => {
        onOutput?.({ type: 'info', data: `\n🌐 Server ready at ${url}\n` });
        onUrl?.(url);
    });
}

/**
 * Convert a flat file map to WebContainer file tree
 */
export function filesToTree(files: Record<string, string>): FileSystemTree {
    const tree: FileSystemTree = {};

    for (const [path, contents] of Object.entries(files)) {
        const parts = path.split('/').filter(Boolean);
        let current: FileSystemTree = tree;

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!current[part]) {
                current[part] = { directory: {} };
            }
            current = (current[part] as DirectoryNode).directory;
        }

        const filename = parts[parts.length - 1];
        current[filename] = { file: { contents } };
    }

    return tree;
}

/**
 * Default Vite + React project template
 */
export const defaultProjectFiles: Record<string, string> = {
    'package.json': JSON.stringify({
        name: 'genapps-project',
        private: true,
        version: '0.0.0',
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview'
        },
        dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0'
        },
        devDependencies: {
            '@vitejs/plugin-react': '^4.0.0',
            vite: '^5.0.0'
        }
    }, null, 2),

    'vite.config.js': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: true }
});
`.trim(),

    'index.html': `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GenApps Project</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`.trim(),

    'src/main.jsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`.trim(),

    'src/App.jsx': `
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to GenApps
        </h1>
        <p className="text-xl text-gray-300">
          Your AI-generated website is ready!
        </p>
      </div>
    </div>
  );
}
`.trim()
};
