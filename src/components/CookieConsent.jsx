import React, { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('genapps_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        dismiss('accepted');
    };

    const handleDecline = () => {
        dismiss('declined');
    };

    const dismiss = (value) => {
        setExiting(true);
        setTimeout(() => {
            localStorage.setItem('genapps_cookie_consent', value);
            setVisible(false);
        }, 400);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-2rem)] max-w-lg transition-all duration-500 ${exiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0 animate-slide-in-bottom'
                }`}
        >
            <div
                className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7)' }}
            >
                <div className="flex items-start gap-3 flex-1">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-200/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="h-4 w-4 text-brand-500" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900 mb-0.5">We value your privacy</p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.{' '}
                            <a href="/privacy#cookies" className="text-brand-500 hover:text-brand-600 font-semibold transition-colors">Learn more</a>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
                    <button
                        onClick={handleDecline}
                        className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 bg-white/60 border border-slate-200/50 rounded-xl transition-all hover:bg-white/80"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(135deg, #0ea5e9, #7c3aed)',
                            boxShadow: '0 4px 14px rgba(14,165,233,0.25)',
                        }}
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
