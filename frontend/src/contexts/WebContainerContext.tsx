import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { WebContainer } from '@webcontainer/api';
import {
    bootWebContainer,
    mountFiles,
    writeFile,
    readFile,
    runCommand,
    installDependencies,
    startDevServer,
    filesToTree,
    defaultProjectFiles,
    type TerminalCallback
} from '../lib/webcontainer';
import {
    type ProjectState,
    type ProjectFile,
    type ProjectHistory,
    createEmptyProject,
    createProjectHistory,
    pushToHistory,
    undo as undoHistory,
    redo as redoHistory,
    canUndo,
    canRedo,
    saveProject,
    loadProject,
    getLanguageFromPath
} from '../lib/projectStore';

interface WebContainerContextType {
    // Container State
    webcontainer: WebContainer | null;
    isLoading: boolean;
    isGenerating: boolean;
    previewUrl: string | null;
    terminalOutput: string[];

    // Project State
    project: ProjectState;
    projectHistory: ProjectHistory;

    // File Operations
    files: ProjectFile[];
    activeFile: ProjectFile | null;
    setActiveFile: (file: ProjectFile | null) => void;

    // Actions
    boot: () => Promise<void>;
    runDev: () => Promise<void>;
    write: (path: string, content: string) => Promise<void>;
    read: (path: string) => Promise<string>;
    runCmd: (command: string, args: string[]) => Promise<number>;

    // Project Actions
    updateProjectName: (name: string) => void;
    saveCurrentProject: () => void;
    addFile: (path: string, content: string) => void;
    updateFile: (path: string, content: string) => void;
    deleteFile: (path: string) => void;

    // History
    handleUndo: () => void;
    handleRedo: () => void;
    canUndoAction: boolean;
    canRedoAction: boolean;

    // Generation State
    setIsGenerating: (value: boolean) => void;
    clearTerminal: () => void;
}

const WebContainerContext = createContext<WebContainerContextType | null>(null);

export function WebContainerProvider({ children }: { children: React.ReactNode }) {
    const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

    // Project state
    const [project, setProject] = useState<ProjectState>(() => {
        const saved = loadProject();
        return saved || createEmptyProject('My App');
    });
    const [projectHistory, setProjectHistory] = useState<ProjectHistory>(() => createProjectHistory(project));
    const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);

    // Track if dev server is running
    const devServerStarted = useRef(false);

    const appendOutput = useCallback((output: { type: string, data: string }) => {
        setTerminalOutput(prev => [...prev, output.data]);
    }, []);

    const clearTerminal = useCallback(() => {
        setTerminalOutput([]);
    }, []);

    // Initialize WebContainer on mount
    const init = useCallback(async () => {
        setIsLoading(true);
        try {
            const instance = await bootWebContainer();
            setWebcontainer(instance);

            // Mount default project files for a quick start
            const tree = filesToTree(defaultProjectFiles);
            await instance.mount(tree);

            // Set initial files from default project
            const initialFiles: ProjectFile[] = Object.entries(defaultProjectFiles).map(([path, content]) => ({
                path,
                content,
                language: getLanguageFromPath(path)
            }));

            setProject(prev => ({
                ...prev,
                files: initialFiles
            }));

            // Set first file as active
            if (initialFiles.length > 0) {
                setActiveFile(initialFiles.find(f => f.path === 'src/App.jsx') || initialFiles[0]);
            }

            setIsLoading(false);
            appendOutput({ type: 'info', data: '✅ WebContainer ready!\n' });
        } catch (error) {
            console.error('Failed to boot WebContainer:', error);
            appendOutput({ type: 'stderr', data: `❌ Failed to boot: ${error}\n` });
            setIsLoading(false);
        }
    }, [appendOutput]);

    useEffect(() => {
        init();
    }, [init]);

    // Run dev server
    const runDev = useCallback(async () => {
        if (!webcontainer || devServerStarted.current) return;
        devServerStarted.current = true;

        appendOutput({ type: 'info', data: '\n📦 Installing dependencies...\n' });

        const installSuccess = await installDependencies(appendOutput);
        if (!installSuccess) {
            devServerStarted.current = false;
            return;
        }

        appendOutput({ type: 'info', data: '\n🚀 Starting dev server...\n' });

        await startDevServer(appendOutput, (url) => {
            console.log('Dev server ready at:', url);
            appendOutput({ type: 'info', data: `\n🌐 Preview ready at: ${url}\n` });
            setPreviewUrl(url);
        });
    }, [webcontainer, appendOutput]);

    // Write file to WebContainer and update state
    const write = useCallback(async (path: string, content: string) => {
        await writeFile(path, content);

        // Update project files
        setProject(prev => {
            const existingIndex = prev.files.findIndex(f => f.path === path);
            const newFile: ProjectFile = {
                path,
                content,
                language: getLanguageFromPath(path)
            };

            let newFiles: ProjectFile[];
            if (existingIndex >= 0) {
                newFiles = [...prev.files];
                newFiles[existingIndex] = newFile;
            } else {
                newFiles = [...prev.files, newFile];
            }

            const newProject = {
                ...prev,
                files: newFiles,
                updatedAt: new Date().toISOString()
            };

            return newProject;
        });
    }, []);

    // Read file from WebContainer
    const read = useCallback(async (path: string): Promise<string> => {
        try {
            return await readFile(path);
        } catch (error) {
            console.error('Failed to read file:', path, error);
            return '';
        }
    }, []);

    // Run command
    const runCmd = useCallback(async (command: string, args: string[]) => {
        return await runCommand(command, args, appendOutput);
    }, [appendOutput]);

    // Update project name
    const updateProjectName = useCallback((name: string) => {
        setProject(prev => {
            const newProject = { ...prev, name };
            // Push to history
            setProjectHistory(h => pushToHistory(h, newProject));
            return newProject;
        });
    }, []);

    // Save project to localStorage
    const saveCurrentProject = useCallback(() => {
        saveProject(project);
        appendOutput({ type: 'info', data: '💾 Project saved!\n' });
    }, [project, appendOutput]);

    // Add a new file
    const addFile = useCallback((path: string, content: string) => {
        setProject(prev => {
            const newFile: ProjectFile = {
                path,
                content,
                language: getLanguageFromPath(path)
            };
            const newProject = {
                ...prev,
                files: [...prev.files, newFile],
                updatedAt: new Date().toISOString()
            };
            setProjectHistory(h => pushToHistory(h, newProject));
            return newProject;
        });

        // Also write to WebContainer
        writeFile(path, content);
    }, []);

    // Update a file
    const updateFile = useCallback((path: string, content: string) => {
        setProject(prev => {
            const newFiles = prev.files.map(f =>
                f.path === path ? { ...f, content } : f
            );
            const newProject = {
                ...prev,
                files: newFiles,
                updatedAt: new Date().toISOString()
            };
            return newProject;
        });

        // Also write to WebContainer
        writeFile(path, content);
    }, []);

    // Delete a file
    const deleteFile = useCallback((path: string) => {
        setProject(prev => {
            const newProject = {
                ...prev,
                files: prev.files.filter(f => f.path !== path),
                updatedAt: new Date().toISOString()
            };
            setProjectHistory(h => pushToHistory(h, newProject));
            return newProject;
        });
    }, []);

    // Undo
    const handleUndo = useCallback(() => {
        setProjectHistory(prev => {
            const newHistory = undoHistory(prev);
            setProject(newHistory.present);
            return newHistory;
        });
    }, []);

    // Redo
    const handleRedo = useCallback(() => {
        setProjectHistory(prev => {
            const newHistory = redoHistory(prev);
            setProject(newHistory.present);
            return newHistory;
        });
    }, []);

    const value: WebContainerContextType = {
        webcontainer,
        isLoading,
        isGenerating,
        previewUrl,
        terminalOutput,
        project,
        projectHistory,
        files: project.files,
        activeFile,
        setActiveFile,
        boot: init,
        runDev,
        write,
        read,
        runCmd,
        updateProjectName,
        saveCurrentProject,
        addFile,
        updateFile,
        deleteFile,
        handleUndo,
        handleRedo,
        canUndoAction: canUndo(projectHistory),
        canRedoAction: canRedo(projectHistory),
        setIsGenerating,
        clearTerminal
    };

    return (
        <WebContainerContext.Provider value={value}>
            {children}
        </WebContainerContext.Provider>
    );
}

export function useWebContainer() {
    const context = useContext(WebContainerContext);
    if (!context) {
        throw new Error('useWebContainer must be used within a WebContainerProvider');
    }
    return context;
}
