import React from 'react';
import { FileText, Shield, CreditCard, Scale, AlertTriangle, RefreshCw, Users, Ban, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
    {
        icon: FileText,
        title: '1. Acceptance of Terms',
        items: [
            { text: 'By accessing or using Genapps ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.' },
            { text: 'These terms apply to all users, including visitors, registered users, and paying subscribers. We reserve the right to update these terms at any time, and continued use of the Service constitutes acceptance of any modifications.' },
        ],
    },
    {
        icon: Shield,
        title: '2. Description of Service',
        items: [
            { text: 'Genapps is an AI-powered website and mobile app generation platform that creates production-ready code from text descriptions. The Service includes website/app generation, template selection, code export, deployment tools, and prompt enhancement features.' },
            { text: 'Features may vary by subscription plan. We reserve the right to modify, suspend, or discontinue any feature of the Service at any time with reasonable notice.' },
        ],
    },
    {
        icon: Users,
        title: '3. User Accounts',
        items: [
            { text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information during registration.' },
            { text: 'You must notify us immediately of any unauthorized use of your account. We are not liable for any loss arising from unauthorized account access where you have failed to maintain credential security.' },
            { text: 'You must be at least 13 years of age (or the minimum age in your jurisdiction) to create an account and use the Service.' },
        ],
    },
    {
        icon: Scale,
        title: '4. Intellectual Property',
        items: [
            { subtitle: 'Your Content', text: 'You retain full ownership of websites and applications generated using our Service. The generated code is yours to use, modify, distribute, and commercialize without restriction.' },
            { subtitle: 'Our Platform', text: 'The Genapps platform, including its design, branding, source code, AI models, and underlying technology, remains our intellectual property. You may not copy, modify, reverse-engineer, or create derivative works from any part of the platform.' },
            { subtitle: 'Feedback', text: 'If you provide feedback or suggestions about the Service, we may use them without obligation or compensation to you.' },
        ],
    },
    {
        icon: CreditCard,
        title: '5. Payment, Subscriptions & Billing',
        items: [
            { subtitle: 'Payment Processor', text: 'All payments are processed by Lemon Squeezy, Inc., which acts as our Merchant of Record. When you purchase a subscription, you are transacting with Lemon Squeezy. Their terms of service and privacy policy apply to your payment.', link: { href: 'https://www.lemonsqueezy.com/terms', label: 'View Lemon Squeezy Terms →' } },
            { subtitle: 'Subscription Plans', text: 'Paid subscriptions are available on monthly and annual billing cycles. Prices are displayed on our Pricing page and are subject to change with 30 days\' notice to existing subscribers.' },
            { subtitle: 'Auto-Renewal', text: 'Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date. You will be charged the then-current subscription price at renewal.' },
            { subtitle: 'Cancellation', text: 'You may cancel your subscription at any time through the Lemon Squeezy customer portal. Cancellation takes effect at the end of the current billing period — you retain access until then. No partial refunds are issued for unused time within a billing period.' },
            { subtitle: 'Currency', text: 'All prices are listed in U.S. Dollars (USD). Applicable taxes (VAT, GST, sales tax) are calculated and collected by Lemon Squeezy based on your location.' },
        ],
    },
    {
        icon: RefreshCw,
        title: '6. Refund Policy',
        items: [
            { text: 'We offer a 30-day money-back guarantee on all new subscriptions. If you are not satisfied with the Service, you may request a full refund within 30 days of your initial purchase.' },
            { text: 'Refund requests after the 30-day window are evaluated on a case-by-case basis. Refunds are processed through Lemon Squeezy and may take up to 10 business days to appear on your statement.' },
            { text: 'For complete details, please see our dedicated Refund Policy page.' },
        ],
        link: { to: '/refund', label: 'View Full Refund Policy →' },
    },
    {
        icon: Ban,
        title: '7. Acceptable Use',
        items: [
            { text: 'You may not use the Service to generate websites or applications containing:' },
            { text: '• Illegal content, malware, or phishing pages' },
            { text: '• Content that infringes third-party intellectual property rights' },
            { text: '• Sexually explicit, hateful, or violent content' },
            { text: '• Websites designed to deceive, defraud, or mislead users' },
            { text: '• Spam, automated scraping tools, or content farm generators' },
            { text: 'We reserve the right to suspend or terminate accounts that violate these guidelines without prior notice.' },
        ],
    },
    {
        icon: AlertTriangle,
        title: '8. Limitation of Liability',
        items: [
            { text: 'Genapps is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.' },
            { text: 'We are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including but not limited to loss of revenue, data, or business opportunities.' },
            { text: 'Our total aggregate liability to you for any claims arising from the Service is limited to the amount you have paid us in the 12 months preceding the claim.' },
        ],
    },
    {
        icon: Shield,
        title: '9. Dispute Resolution',
        items: [
            { text: 'Any disputes arising from these Terms or your use of the Service shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.' },
            { text: 'You agree to resolve disputes on an individual basis and waive any right to participate in a class action lawsuit or class-wide arbitration.' },
        ],
    },
    {
        icon: Scale,
        title: '10. Governing Law',
        items: [
            { text: 'These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.' },
            { text: 'Any legal action or proceeding arising under these Terms shall be brought exclusively in the federal or state courts located in San Francisco County, California, and you consent to the personal jurisdiction of such courts.' },
        ],
    },
    {
        icon: RefreshCw,
        title: '11. Modifications to Service',
        items: [
            { text: 'We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice (typically 30 days for material changes). We will notify active subscribers via email of any significant changes.' },
            { text: 'We may update these Terms from time to time. The updated version will be indicated by an updated "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.' },
        ],
    },
    {
        icon: Mail,
        title: '12. Contact',
        items: [
            { text: 'Questions about these Terms should be directed to:' },
            { text: 'Email: legal@genapps.online' },
            { text: 'Address: Genapps AI, 548 Market St, San Francisco, CA 94104' },
        ],
    },
];

export default function Terms() {
    return (
        <div className="pt-24">
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] right-[20%] animate-cloud-drift opacity-30" />
                    <div className="cloud-shape cloud-shape-2 top-[5%] left-[10%] animate-cloud-drift-reverse opacity-20" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge">
                        <FileText className="h-3.5 w-3.5 mr-2" />
                        Legal
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-display text-slate-900">
                        Terms of <span className="gradient-text">Service</span>
                    </h1>
                    <p className="text-sm text-slate-500">Last updated: February 17, 2025</p>
                    <p className="text-slate-500 max-w-2xl mx-auto mt-4 leading-relaxed">
                        Please read these terms carefully before using Genapps. By using our service, you agree to these terms.
                    </p>
                </div>
            </section>

            <section className="section-padding pt-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {sections.map((section, i) => (
                            <div key={i} className="glass-card p-8 space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/50 flex items-center justify-center flex-shrink-0">
                                        <section.icon className="h-5 w-5 text-brand-500" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 font-display">{section.title}</h2>
                                </div>
                                <div className="space-y-4 pl-0 sm:pl-[52px]">
                                    {section.items.map((item, j) => (
                                        <div key={j}>
                                            {item.subtitle && (
                                                <h3 className="text-sm font-semibold text-slate-800 mb-1">{item.subtitle}</h3>
                                            )}
                                            <p className="text-slate-500 leading-relaxed text-sm">{item.text}</p>
                                            {item.link && (
                                                <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-brand-500 hover:text-brand-600 font-semibold transition-colors mt-1">
                                                    {item.link.label}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                    {section.link && (
                                        <Link to={section.link.to} className="inline-flex items-center text-sm text-brand-500 hover:text-brand-600 font-semibold transition-colors mt-2">
                                            {section.link.label}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
