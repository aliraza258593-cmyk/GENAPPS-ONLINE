import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext({});

export function useToast() {
    return useContext(ToastContext);
}

let toastIdCounter = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timersRef = useRef({});

    const removeToast = useCallback((id) => {
        if (timersRef.current[id]) {
            clearTimeout(timersRef.current[id]);
            delete timersRef.current[id];
        }
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = ++toastIdCounter;
        const toast = { id, message, type, duration, createdAt: Date.now() };

        setToasts((prev) => [...prev.slice(-4), toast]); // Keep max 5

        timersRef.current[id] = setTimeout(() => {
            removeToast(id);
        }, duration);

        return id;
    }, [removeToast]);

    const success = useCallback((msg, dur) => showToast(msg, 'success', dur), [showToast]);
    const error = useCallback((msg, dur) => showToast(msg, 'error', dur), [showToast]);
    const warning = useCallback((msg, dur) => showToast(msg, 'warning', dur), [showToast]);
    const info = useCallback((msg, dur) => showToast(msg, 'info', dur), [showToast]);

    return (
        <ToastContext.Provider value={{ showToast, success, error, warning, info, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

/* ── Toast Icons ── */
const icons = {
    success: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86l-8.6 14.86A1 1 0 002.56 20h16.88a1 1 0 00.87-1.28l-8.6-14.86a1 1 0 00-1.72 0z" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
    ),
};

const typeStyles = {
    success: {
        bg: 'bg-emerald-50 border-emerald-200',
        icon: 'text-emerald-500 bg-emerald-100',
        text: 'text-emerald-800',
        progress: 'bg-emerald-500',
    },
    error: {
        bg: 'bg-red-50 border-red-200',
        icon: 'text-red-500 bg-red-100',
        text: 'text-red-800',
        progress: 'bg-red-500',
    },
    warning: {
        bg: 'bg-amber-50 border-amber-200',
        icon: 'text-amber-500 bg-amber-100',
        text: 'text-amber-800',
        progress: 'bg-amber-500',
    },
    info: {
        bg: 'bg-blue-50 border-blue-200',
        icon: 'text-blue-500 bg-blue-100',
        text: 'text-blue-800',
        progress: 'bg-blue-500',
    },
};

/* ── Single Toast ── */
function Toast({ toast, onRemove }) {
    const style = typeStyles[toast.type] || typeStyles.info;

    return (
        <div
            className={`
                relative flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm
                ${style.bg}
                animate-toast-in
            `}
            style={{ minWidth: '320px', maxWidth: '420px' }}
            role="alert"
        >
            {/* Icon */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${style.icon}`}>
                {icons[toast.type]}
            </div>

            {/* Message */}
            <p className={`flex-1 text-sm font-medium leading-snug pt-1 ${style.text}`}>
                {toast.message}
            </p>

            {/* Close */}
            <button
                onClick={() => onRemove(toast.id)}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors mt-0.5"
                aria-label="Dismiss"
            >
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-black/5 overflow-hidden">
                <div
                    className={`h-full rounded-full ${style.progress}`}
                    style={{
                        animation: `toast-progress ${toast.duration}ms linear forwards`,
                    }}
                />
            </div>
        </div>
    );
}

/* ── Toast Container ── */
function ToastContainer({ toasts, onRemove }) {
    if (toasts.length === 0) return null;

    return (
        <div
            className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none"
            aria-live="polite"
        >
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Toast toast={toast} onRemove={onRemove} />
                </div>
            ))}
        </div>
    );
}
