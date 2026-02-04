import React, { useState, useMemo } from 'react';
import {
    ChevronRight,
    ChevronDown,
    File,
    Folder,
    FolderOpen,
    FileCode,
    FileJson,
    FileText,
    Image as ImageIcon,
    Menu,
    X
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { ProjectFile } from '../../../lib/projectStore';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    files: ProjectFile[];
    activeFile: ProjectFile | null;
    onFileSelect: (file: ProjectFile) => void;
}

const getFileIcon = (path: string) => {
    const ext = path.split('.').pop()?.toLowerCase() || '';

    const iconMap: Record<string, typeof FileCode> = {
        'tsx': FileCode,
        'ts': FileCode,
        'jsx': FileCode,
        'js': FileCode,
        'json': FileJson,
        'md': FileText,
        'html': FileCode,
        'css': FileCode,
        'png': ImageIcon,
        'jpg': ImageIcon,
        'svg': ImageIcon
    };

    return iconMap[ext] || File;
};

const getFileColor = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase() || '';

    const colorMap: Record<string, string> = {
        'tsx': 'text-blue-400',
        'ts': 'text-blue-400',
        'jsx': 'text-yellow-400',
        'js': 'text-yellow-400',
        'json': 'text-orange-400',
        'md': 'text-gray-400',
        'html': 'text-orange-400',
        'css': 'text-pink-400'
    };

    return colorMap[ext] || 'text-gray-400';
};

// Build file tree structure
const buildTree = (files: ProjectFile[]): Map<string, { files: ProjectFile[], dirs: Set<string> }> => {
    const tree = new Map<string, { files: ProjectFile[], dirs: Set<string> }>();

    files.forEach(file => {
        const parts = file.path.split('/');
        const fileName = parts.pop()!;
        const dirPath = parts.length > 0 ? parts.join('/') : '';

        // Ensure parent directories exist
        let currentPath = '';
        parts.forEach(part => {
            const parentPath = currentPath;
            currentPath = currentPath ? `${currentPath}/${part}` : part;

            if (!tree.has(parentPath)) {
                tree.set(parentPath, { files: [], dirs: new Set() });
            }
            tree.get(parentPath)!.dirs.add(currentPath);

            if (!tree.has(currentPath)) {
                tree.set(currentPath, { files: [], dirs: new Set() });
            }
        });

        // Add file to its directory
        if (!tree.has(dirPath)) {
            tree.set(dirPath, { files: [], dirs: new Set() });
        }
        tree.get(dirPath)!.files.push(file);
    });

    return tree;
};

interface DirectoryNodeProps {
    path: string;
    tree: Map<string, { files: ProjectFile[], dirs: Set<string> }>;
    activeFile: ProjectFile | null;
    onFileSelect: (file: ProjectFile) => void;
    depth?: number;
}

const DirectoryNode = ({ path, tree, activeFile, onFileSelect, depth = 0 }: DirectoryNodeProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const node = tree.get(path);

    if (!node) return null;

    const dirName = path ? path.split('/').pop()! : 'root';
    const sortedDirs = Array.from(node.dirs).sort();
    const sortedFiles = [...node.files].sort((a, b) => a.path.localeCompare(b.path));

    // Root level
    if (!path) {
        return (
            <div className="space-y-0.5">
                {sortedDirs.map(dir => (
                    <DirectoryNode
                        key={dir}
                        path={dir}
                        tree={tree}
                        activeFile={activeFile}
                        onFileSelect={onFileSelect}
                        depth={0}
                    />
                ))}
                {sortedFiles.map(file => (
                    <FileNode
                        key={file.path}
                        file={file}
                        activeFile={activeFile}
                        onFileSelect={onFileSelect}
                        depth={0}
                    />
                ))}
            </div>
        );
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 text-left text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors",
                )}
                style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
                {isOpen ? (
                    <ChevronDown className="w-3 h-3 shrink-0" />
                ) : (
                    <ChevronRight className="w-3 h-3 shrink-0" />
                )}
                {isOpen ? (
                    <FolderOpen className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                    <Folder className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-sm truncate">{dirName}</span>
            </button>

            {isOpen && (
                <div className="space-y-0.5">
                    {sortedDirs.map(dir => (
                        <DirectoryNode
                            key={dir}
                            path={dir}
                            tree={tree}
                            activeFile={activeFile}
                            onFileSelect={onFileSelect}
                            depth={depth + 1}
                        />
                    ))}
                    {sortedFiles.map(file => (
                        <FileNode
                            key={file.path}
                            file={file}
                            activeFile={activeFile}
                            onFileSelect={onFileSelect}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface FileNodeProps {
    file: ProjectFile;
    activeFile: ProjectFile | null;
    onFileSelect: (file: ProjectFile) => void;
    depth: number;
}

const FileNode = ({ file, activeFile, onFileSelect, depth }: FileNodeProps) => {
    const Icon = getFileIcon(file.path);
    const color = getFileColor(file.path);
    const fileName = file.path.split('/').pop()!;
    const isActive = activeFile?.path === file.path;

    return (
        <button
            onClick={() => onFileSelect(file)}
            className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 text-left rounded-lg transition-colors",
                isActive
                    ? "bg-violet-500/20 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
            style={{ paddingLeft: `${depth * 12 + 20}px` }}
        >
            <Icon className={cn("w-4 h-4 shrink-0", color)} />
            <span className="text-sm truncate">{fileName}</span>
        </button>
    );
};

export const Sidebar = ({ isCollapsed, onToggle, files, activeFile, onFileSelect }: SidebarProps) => {
    const tree = useMemo(() => buildTree(files), [files]);

    return (
        <>
            {/* Collapsed Toggle Button */}
            {isCollapsed && (
                <button
                    onClick={onToggle}
                    className="w-10 h-full border-r border-white/5 flex items-start justify-center pt-3 bg-[#0c0c0e] hover:bg-white/5 transition-colors shrink-0"
                >
                    <Menu className="w-4 h-4 text-gray-500" />
                </button>
            )}

            {/* Expanded Sidebar */}
            {!isCollapsed && (
                <div className="w-56 h-full bg-[#0c0c0e] border-r border-white/5 flex flex-col shrink-0">
                    {/* Header */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Files
                        </span>
                        <button
                            onClick={onToggle}
                            className="p-1 text-gray-500 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* File Tree */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                        {files.length > 0 ? (
                            <DirectoryNode
                                path=""
                                tree={tree}
                                activeFile={activeFile}
                                onFileSelect={onFileSelect}
                            />
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-sm text-gray-500">No files yet</p>
                                <p className="text-xs text-gray-600 mt-1">
                                    Generate an app to see files
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
