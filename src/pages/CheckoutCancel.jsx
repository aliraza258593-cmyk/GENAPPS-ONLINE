import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, CreditCard } from 'lucide-react';

export default function CheckoutCancel() {
    return (
        <div className="pt-24 min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-40" />
            </div>

            <div className="section-container relative z-10 text-center max-w-lg animate-scale-in">
                <div className="glass-card p-10 sm:p-12">
                    {/* Icon */}
                    <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200/50 flex items-center justify-center mx-auto mb-6">
                        <XCircle className="h-10 w-10 text-amber-500" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-3">
                        Checkout Cancelled
                    </h1>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        No worries! Your account hasn't been charged. You can still use Genapps's free features or upgrade anytime.
                    </p>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Link
                            to="/pricing"
                            className="btn-primary w-full py-3.5 rounded-xl sparkle-btn flex items-center justify-center"
                        >
                            <CreditCard className="h-4 w-4 mr-2" />
                            View Plans
                        </Link>
                        <Link
                            to="/"
                            className="btn-secondary w-full py-3.5 rounded-xl flex items-center justify-center"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
