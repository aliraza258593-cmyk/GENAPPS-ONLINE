import React from 'react';
import { RefreshCw, Shield, Clock, AlertCircle, CheckCircle2, Mail, HelpCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
    {
        icon: Shield,
        title: '30-Day Money-Back Guarantee',
        text: 'We stand behind Genapps with a no-questions-asked 30-day money-back guarantee. If you purchase any subscription plan and are not completely satisfied, you can request a full refund within 30 days of your initial purchase date.',
        highlight: true,
    },
    {
        icon: CheckCircle2,
        title: 'What Qualifies for a Refund',
        items: [
            'First-time subscription purchases within 30 days of payment',
            'Billing errors or duplicate charges (refunded at any time)',
            'Service outages that significantly impacted your ability to use Genapps',
            'Cases where advertised features were materially unavailable',
        ],
    },
    {
        icon: AlertCircle,
        title: 'What Does NOT Qualify for a Refund',
        items: [
            'Requests made more than 30 days after the initial purchase',
            'Subscription renewals (you can cancel before renewal to avoid charges)',
            'Violations of our Terms of Service or Acceptable Use Policy',
            'Dissatisfaction with AI-generated output quality (we recommend using the free tier first)',
            'Failure to cancel before an automatic renewal date',
        ],
    },
    {
        icon: Clock,
        title: 'How to Request a Refund',
        steps: [
            { step: '1', text: 'Email us at refunds@genapps.online with your account email and reason for the refund request.' },
            { step: '2', text: 'Our team will review your request and respond within 2 business days.' },
            { step: '3', text: 'If approved, the refund will be processed through Lemon Squeezy (our payment processor) within 5-10 business days.' },
            { step: '4', text: 'The refund will appear on your original payment method. Processing time may vary by your bank or card issuer.' },
        ],
    },
    {
        icon: RefreshCw,
        title: 'Subscription Cancellation vs. Refund',
        items: [
            'Cancellation: Stops your subscription from renewing. You keep access until the end of your current billing period. No refund is issued for the remaining time.',
            'Refund: Returns the payment for the current billing period. Your subscription is immediately terminated and access to paid features is removed.',
            'You can cancel your subscription anytime through the Lemon Squeezy customer portal without needing to contact us.',
        ],
    },
    {
        icon: CreditCard,
        title: 'Payment Processing & Lemon Squeezy',
        items: [
            'All payments and refunds are processed by Lemon Squeezy, Inc., which acts as the Merchant of Record for all Genapps transactions.',
            'When you make a purchase on Genapps, you are transacting with Lemon Squeezy. They handle payment processing, tax compliance, billing, and refund disbursement.',
            'Refunds are issued back to your original payment method by Lemon Squeezy and may take 5–10 business days to appear on your statement.',
        ],
        link: { href: 'https://www.lemonsqueezy.com/terms', label: 'View Lemon Squeezy Terms →' },
    },
    {
        icon: HelpCircle,
        title: 'Chargebacks & Disputes',
        items: [
            'We strongly encourage contacting us before initiating a chargeback with your bank. We resolve most issues within 24 hours.',
            'Chargebacks are handled by Lemon Squeezy as the Merchant of Record. A $15 dispute fee may apply if a chargeback is filed.',
            'Filing a chargeback without first contacting us may result in account suspension.',
        ],
    },
];

export default function Refund() {
    return (
        <div className="pt-24">
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[15%] animate-cloud-drift opacity-30" />
                    <div className="cloud-shape cloud-shape-2 top-[5%] right-[20%] animate-cloud-drift-reverse opacity-20" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge">
                        <RefreshCw className="h-3.5 w-3.5 mr-2" />
                        Legal
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-display text-slate-900">
                        Refund <span className="gradient-text">Policy</span>
                    </h1>
                    <p className="text-sm text-slate-500">Last updated: February 17, 2025</p>
                    <p className="text-slate-500 max-w-2xl mx-auto mt-4 leading-relaxed">
                        We want you to be completely satisfied with Genapps. Here's everything you need to know about our refund process.
                    </p>
                </div>
            </section>

            <section className="section-padding pt-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {sections.map((section, i) => (
                            <div key={i} className={`glass-card p-8 space-y-5 ${section.highlight ? 'ring-2 ring-emerald-200/50 bg-emerald-50/20' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${section.highlight
                                        ? 'bg-emerald-50 border border-emerald-200/50'
                                        : 'bg-brand-50 border border-brand-200/50'
                                        }`}>
                                        <section.icon className={`h-5 w-5 ${section.highlight ? 'text-emerald-500' : 'text-brand-500'}`} />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 font-display">{section.title}</h2>
                                </div>

                                <div className="pl-0 sm:pl-[52px] space-y-3">
                                    {section.text && (
                                        <p className="text-slate-500 leading-relaxed text-sm">{section.text}</p>
                                    )}
                                    {section.items && (
                                        <ul className="space-y-2">
                                            {section.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-2 text-sm text-slate-500 leading-relaxed">
                                                    <span className="text-brand-400 mt-1 flex-shrink-0">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.steps && (
                                        <div className="space-y-3">
                                            {section.steps.map((s) => (
                                                <div key={s.step} className="flex items-start gap-3">
                                                    <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200/50 flex items-center justify-center flex-shrink-0 text-xs font-bold text-brand-500">
                                                        {s.step}
                                                    </div>
                                                    <p className="text-sm text-slate-500 leading-relaxed pt-1">{s.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {section.link && (
                                        <a href={section.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-brand-500 hover:text-brand-600 font-semibold transition-colors mt-2">
                                            {section.link.label}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Contact CTA */}
                        <div className="glass-card p-8 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200/50 flex items-center justify-center mx-auto mb-4">
                                <Mail className="h-7 w-7 text-brand-500" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 font-display mb-2">Need Help?</h3>
                            <p className="text-sm text-slate-500 mb-4">
                                Contact us at <a href="mailto:refunds@genapps.online" className="text-brand-500 font-semibold hover:text-brand-600 transition-colors">refunds@genapps.online</a> and
                                we'll respond within 24 hours.
                            </p>
                            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                                <Link to="/terms" className="hover:text-brand-500 transition-colors">Terms of Service</Link>
                                <span>•</span>
                                <Link to="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link>
                                <span>•</span>
                                <Link to="/contact" className="hover:text-brand-500 transition-colors">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
