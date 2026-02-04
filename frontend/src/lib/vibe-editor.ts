/**
 * Vibe Editor - Lovable-style component editing overlay
 * Allows users to click elements in the preview and request changes
 */

export interface VibeSelection {
    componentPath: string;
    elementSelector: string;
    elementHTML: string;
    currentCode: string;
}

export interface VibeEditRequest {
    prompt: string;
    targetFile: string;
    originalCode: string;
}

/**
 * Inject the vibe editing overlay into an iframe
 */
export function injectVibeOverlay(
    iframe: HTMLIFrameElement,
    onSelect: (selection: VibeSelection) => void
): () => void {
    const doc = iframe.contentDocument;
    if (!doc) return () => { };

    // Inject styles
    const style = doc.createElement('style');
    style.id = 'vibe-editor-styles';
    style.textContent = `
    .vibe-highlight {
      outline: 2px solid #8B5CF6 !important;
      outline-offset: 2px !important;
      cursor: pointer !important;
      position: relative !important;
    }
    
    .vibe-highlight::before {
      content: 'Click to Edit';
      position: absolute;
      top: -24px;
      left: 0;
      background: linear-gradient(135deg, #8B5CF6, #EC4899);
      color: white;
      padding: 2px 8px;
      font-size: 10px;
      border-radius: 4px;
      font-family: system-ui, sans-serif;
      z-index: 99999;
      white-space: nowrap;
    }
    
    .vibe-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 99998;
    }
  `;
    doc.head.appendChild(style);

    // Add overlay div
    const overlay = doc.createElement('div');
    overlay.className = 'vibe-overlay';
    doc.body.appendChild(overlay);

    // Track current highlighted element
    let currentHighlight: Element | null = null;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
        const target = e.target as Element;

        // Skip body, html, and overlay
        if (target === doc.body || target === doc.documentElement || target.classList.contains('vibe-overlay')) {
            return;
        }

        // Remove previous highlight
        if (currentHighlight && currentHighlight !== target) {
            currentHighlight.classList.remove('vibe-highlight');
        }

        // Add new highlight
        target.classList.add('vibe-highlight');
        currentHighlight = target;
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
        if (currentHighlight) {
            currentHighlight.classList.remove('vibe-highlight');
            currentHighlight = null;
        }
    };

    // Click handler
    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target as Element;

        if (target === doc.body || target === doc.documentElement) {
            return;
        }

        // Get element info
        const selection: VibeSelection = {
            componentPath: inferComponentPath(target),
            elementSelector: generateSelector(target),
            elementHTML: target.outerHTML.substring(0, 500), // Limit size
            currentCode: '' // Will be filled by caller
        };

        onSelect(selection);
    };

    // Add event listeners
    doc.body.addEventListener('mousemove', handleMouseMove);
    doc.body.addEventListener('mouseleave', handleMouseLeave);
    doc.body.addEventListener('click', handleClick, true);

    // Return cleanup function
    return () => {
        doc.body.removeEventListener('mousemove', handleMouseMove);
        doc.body.removeEventListener('mouseleave', handleMouseLeave);
        doc.body.removeEventListener('click', handleClick, true);
        style.remove();
        overlay.remove();
    };
}

/**
 * Try to infer the component path from data attributes or class names
 */
function inferComponentPath(element: Element): string {
    // Check for data-component attribute
    let current: Element | null = element;
    while (current) {
        const componentAttr = current.getAttribute('data-component');
        if (componentAttr) {
            return componentAttr;
        }
        current = current.parentElement;
    }

    // Infer from class names or element structure
    const classes = element.className;
    if (typeof classes === 'string') {
        // Look for common component patterns
        const patterns = ['header', 'nav', 'hero', 'footer', 'card', 'button', 'modal', 'form'];
        for (const pattern of patterns) {
            if (classes.toLowerCase().includes(pattern)) {
                return `src/components/${pattern.charAt(0).toUpperCase() + pattern.slice(1)}.jsx`;
            }
        }
    }

    // Default to App.jsx for main content
    return 'src/App.jsx';
}

/**
 * Generate a CSS selector for an element
 */
function generateSelector(element: Element): string {
    const parts: string[] = [];
    let current: Element | null = element;

    while (current && current !== document.body) {
        let selector = current.tagName.toLowerCase();

        if (current.id) {
            selector += `#${current.id}`;
            parts.unshift(selector);
            break;
        } else if (current.className && typeof current.className === 'string') {
            const classes = current.className.split(' ').filter(c => c && !c.startsWith('vibe-'));
            if (classes.length > 0) {
                selector += `.${classes.slice(0, 2).join('.')}`;
            }
        }

        parts.unshift(selector);
        current = current.parentElement;
    }

    return parts.join(' > ');
}

/**
 * Create a targeted edit prompt for the AI
 */
export function createEditPrompt(request: VibeEditRequest): string {
    return `
I need to make a targeted edit to my React application.

**Target File:** ${request.targetFile}

**Current Code:**
\`\`\`jsx
${request.originalCode}
\`\`\`

**User's Change Request:**
${request.prompt}

**Instructions:**
1. Only modify the specific part that the user mentioned
2. Keep all other code exactly the same
3. Return the COMPLETE updated file wrapped in boltAction tags
4. Maintain the same styling approach (Tailwind CSS)
5. Ensure the code compiles and runs

Return your response in this format:
<boltArtifact id="edit" title="Code Edit">
<boltAction type="file" filePath="${request.targetFile}">
...COMPLETE UPDATED CODE...
</boltAction>
</boltArtifact>
`.trim();
}

/**
 * UI component for the vibe editor toolbar
 */
export function createVibeToolbar(
    container: HTMLElement,
    onActivate: () => void,
    onDeactivate: () => void
): { setActive: (active: boolean) => void } {
    let isActive = false;

    const toolbar = document.createElement('div');
    toolbar.className = 'vibe-toolbar';
    toolbar.innerHTML = `
    <button id="vibe-toggle" class="vibe-btn">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
      </svg>
      <span>Edit Mode</span>
    </button>
  `;

    // Add styles if not already present
    if (!document.getElementById('vibe-toolbar-styles')) {
        const style = document.createElement('style');
        style.id = 'vibe-toolbar-styles';
        style.textContent = `
      .vibe-toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .vibe-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: rgba(139, 92, 246, 0.1);
        border: 1px solid rgba(139, 92, 246, 0.3);
        color: #A78BFA;
        font-size: 12px;
        font-weight: 500;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .vibe-btn:hover {
        background: rgba(139, 92, 246, 0.2);
        border-color: rgba(139, 92, 246, 0.5);
      }
      
      .vibe-btn.active {
        background: linear-gradient(135deg, #8B5CF6, #EC4899);
        border-color: transparent;
        color: white;
      }
    `;
        document.head.appendChild(style);
    }

    container.appendChild(toolbar);

    const toggleBtn = toolbar.querySelector('#vibe-toggle') as HTMLButtonElement;

    toggleBtn.addEventListener('click', () => {
        isActive = !isActive;
        toggleBtn.classList.toggle('active', isActive);

        if (isActive) {
            onActivate();
        } else {
            onDeactivate();
        }
    });

    return {
        setActive: (active: boolean) => {
            isActive = active;
            toggleBtn.classList.toggle('active', active);
        }
    };
}
