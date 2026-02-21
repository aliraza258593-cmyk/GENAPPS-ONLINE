import React from 'react';
import { Shield, Lock, Globe, Database, CreditCard, Users, Mail } from 'lucide-react';

const sections = [
    {
        icon: Database,
        title: '1. Information We Collect',
        items: [
            { subtitle: 'Account Information', text: 'When you register, we collect your name, email address, and account credentials. If you sign up via GitHub OAuth, we receive your public GitHub profile information.' },
            { subtitle: 'Payment Information', text: 'When you purchase a subscription, payment is processed by Lemon Squeezy, our Merchant of Record. We do NOT store your credit card number, CVV, or full billing details. Lemon Squeezy handles all payment data in accordance with PCI-DSS Level 1 compliance.' },
            { subtitle: 'Usage Data', text: 'We collect data about how you use our service, including website generation prompts, template preferences, generation history, and feature interactions. This helps us improve our AI and user experience.' },
            { subtitle: 'Device & Browser Data', text: 'We automatically collect device type, browser type, IP address, and approximate location for analytics and security purposes.' },
        ],
    },
    {
        icon: Shield,
        title: '2. How We Use Your Information',
        items: [
            { text: 'To provide, maintain, and improve our AI website generation service.' },
            { text: 'To process subscriptions and payments through our payment processor (Lemon Squeezy).' },
            { text: 'To communicate with you about your account, updates, and promotional offers (with your consent).' },
            { text: 'To detect and prevent fraud, abuse, and security threats.' },
            { text: 'To comply with legal obligations and enforce our Terms of Service.' },
        ],
    },
    {
        icon: CreditCard,
        title: '3. Payment Processing & Lemon Squeezy',
        items: [
            { subtitle: 'Merchant of Record', text: 'Lemon Squeezy acts as the Merchant of Record for all transactions on Genapps. This means Lemon Squeezy is the entity that processes your payment, handles tax compliance, and manages billing. When you make a purchase, you are transacting with Lemon Squeezy, Inc.' },
            { subtitle: 'What Lemon Squeezy Stores', text: 'Lemon Squeezy stores your billing information, payment method details, transaction history, and subscription status. Their privacy practices are governed by Lemon Squeezy\'s own Privacy Policy.', link: { href: 'https://www.lemonsqueezy.com/privacy', label: 'View Lemon Squeezy Privacy Policy →' } },
            { subtitle: 'What We Receive', text: 'We receive confirmation of your subscription status (plan, start date, renewal date), your email, and transaction IDs. We do NOT receive or store your full credit card details.' },
        ],
    },
    {
        icon: Lock,
        title: '4. Data Storage & Security',
        items: [
            { text: 'We use Supabase for secure data storage with row-level security (RLS) policies. All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.' },
            { text: 'We follow industry-standard security practices including regular security audits, least-privilege access controls, and secure coding practices.' },
            { text: 'User sessions are managed through secure, HTTP-only cookies with proper expiration policies.' },
        ],
    },
    {
        icon: Globe,
        title: '5. Third-Party Services',
        items: [
            { subtitle: 'Supabase', text: 'Authentication & database storage.', link: { href: 'https://supabase.com/privacy', label: 'Supabase Privacy Policy →' } },
            { subtitle: 'Lemon Squeezy', text: 'Payment processing & subscription management (Merchant of Record).', link: { href: 'https://www.lemonsqueezy.com/privacy', label: 'Lemon Squeezy Privacy Policy →' } },
            { subtitle: 'Vercel', text: 'Optional website deployment.', link: { href: 'https://vercel.com/legal/privacy-policy', label: 'Vercel Privacy Policy →' } },
            { subtitle: 'GitHub', text: 'OAuth authentication & optional code hosting.', link: { href: 'https://docs.github.com/en/site-policy/privacy-policies', label: 'GitHub Privacy Policy →' } },
            { subtitle: 'LongCat AI', text: 'AI content generation engine. Prompts may be processed by the AI provider.' },
        ],
    },
    {
        icon: Users,
        title: '6. Your Rights (GDPR / CCPA)',
        items: [
            { subtitle: 'Right to Access', text: 'You can request a copy of all personal data we hold about you at any time.' },
            { subtitle: 'Right to Rectification', text: 'You can update or correct your personal information through your Dashboard settings.' },
            { subtitle: 'Right to Deletion', text: 'You can request complete deletion of your account and all associated data by contacting us.' },
            { subtitle: 'Right to Data Portability', text: 'You can export your generation history and account data in a machine-readable format.' },
            { subtitle: 'Right to Opt-Out', text: 'You can opt out of marketing communications at any time. You can decline non-essential cookies via our cookie consent banner.' },
            { subtitle: 'California Residents (CCPA)', text: 'We do not sell your personal information. You have the right to know what data we collect, request deletion, and opt out of any data sharing.' },
        ],
    },
    {
        icon: Database,
        title: '7. Data Retention',
        items: [
            { text: 'Account data is retained for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where retention is required by law.' },
            { text: 'Generation history is stored locally in your browser (localStorage) and is not transmitted to our servers beyond the initial AI generation request.' },
            { text: 'Payment records are retained by Lemon Squeezy in accordance with their data retention policy and applicable tax/legal requirements.' },
        ],
    },
    {
        icon: Shield,
        title: '8. Cookies',
        items: [
            { subtitle: 'Essential Cookies', text: 'Required for authentication, session management, and site functionality. These cannot be disabled.' },
            { subtitle: 'Analytics Cookies', text: 'Used to understand how visitors interact with our website. You can opt out via our cookie consent banner.' },
            { subtitle: 'Preference Cookies', text: 'Store your preferences such as cookie consent choices and theme settings.' },
        ],
    },
    {
        icon: Users,
        title: '9. Children\'s Privacy',
        items: [
            { text: 'Genapps is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will immediately delete such information from our servers.' },
            { text: 'If you are a parent or guardian and believe your child has provided us with personal information, please contact us at privacy@genapps.online so we can take appropriate action.' },
        ],
    },
    {
        icon: Mail,
        title: '10. Data Controller',
        items: [
            { text: 'The data controller responsible for your personal data is Genapps AI. Our registered address is 548 Market St, San Francisco, CA 94104, United States.' },
            { text: 'For privacy-related questions, data access requests, or concerns, contact our Data Protection Officer:' },
            { text: 'Email: privacy@genapps.online' },
            { text: 'General inquiries: hello@genapps.online' },
            { text: 'Address: Genapps AI, 548 Market St, San Francisco, CA 94104' },
        ],
    },
];

export default function Privacy() {
    return (
        <div className="pt-24">
            <section className="py-16 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="cloud-shape cloud-shape-1 top-[10%] left-[20%] animate-cloud-drift opacity-30" />
                    <div className="cloud-shape cloud-shape-2 top-[5%] right-[15%] animate-cloud-drift-reverse opacity-20" />
                </div>
                <div className="section-container relative z-10 text-center">
                    <span className="section-badge">
                        <Shield className="h-3.5 w-3.5 mr-2" />
                        Legal
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 font-display text-slate-900">
                        Privacy <span className="gradient-text">Policy</span>
                    </h1>
                    <p className="text-sm text-slate-500">Last updated: February 17, 2025</p>
                    <p className="text-slate-500 max-w-2xl mx-auto mt-4 leading-relaxed">
                        At Genapps, we take your privacy seriously. This policy explains what data we collect,
                        how we use it, and your rights regarding your personal information.
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
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
