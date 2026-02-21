import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageMeta = {
    '/': {
        title: 'Genapps — AI Website Builder | Generate Production-Ready Websites Instantly',
        description: 'Build stunning websites instantly with AI. Genapps generates production-ready HTML, CSS, and React code from your description. 9+ templates, multiple AI models, one-click deploy.',
    },
    '/builder': {
        title: 'Website Builder — Genapps | AI-Powered Code Generation',
        description: 'Describe your website and let AI build it. Choose from 9 templates, 4 AI models, and 3 build types. Download or deploy in one click.',
    },
    '/pricing': {
        title: 'Pricing — Genapps | Plans Starting at $19/mo',
        description: 'Simple, transparent pricing. Start free with 3 generations. Upgrade for unlimited AI website generation, GitHub push, and Vercel deployment.',
    },
    '/login': {
        title: 'Log In — Genapps',
        description: 'Log in to your Genapps account to access your AI website builder dashboard.',
    },
    '/signup': {
        title: 'Sign Up — Genapps | Create Your Free Account',
        description: 'Create a free Genapps account. Build AI-powered websites instantly. No credit card required.',
    },
    '/dashboard': {
        title: 'Dashboard — Genapps',
        description: 'Manage your generated websites, view history, connect integrations, and manage your subscription.',
    },
    '/features': {
        title: 'Features — Genapps | AI Website Generation Platform',
        description: 'Explore Genapps features: 9 templates, 4 AI models, responsive design, one-click deployment, and production-ready code output.',
    },
    '/about': {
        title: 'About — Genapps | AI-Powered Website Builder',
        description: 'Learn about Genapps, the AI-powered platform that generates production-ready websites from simple descriptions.',
    },
    '/contact': {
        title: 'Contact — Genapps | Get in Touch',
        description: 'Have a question or feedback? Contact the Genapps team. We reply within 24 hours.',
    },
    '/docs': {
        title: 'Documentation — Genapps | Getting Started Guide',
        description: 'Learn how to use Genapps to build AI-generated websites. Templates, prompts, deployment, and best practices.',
    },
    '/blog': {
        title: 'Blog — Genapps | AI Development Insights',
        description: 'Read the latest from Genapps on AI website generation, web development trends, and platform updates.',
    },
    '/changelog': {
        title: 'Changelog — Genapps | Latest Updates & Features',
        description: 'See what\'s new in Genapps. Track all updates, new features, and improvements.',
    },
    '/privacy': {
        title: 'Privacy Policy — Genapps',
        description: 'Read the Genapps privacy policy. Learn how we handle your data, cookies, and user information.',
    },
    '/terms': {
        title: 'Terms of Service — Genapps',
        description: 'Read the Genapps terms of service. Understand your rights and obligations as a user.',
    },
    '/refund': {
        title: 'Refund Policy — Genapps',
        description: '30-day money-back guarantee. Read our refund policy for subscription cancellations and refund requests.',
    },
};

export default function SEOHead() {
    const { pathname } = useLocation();

    useEffect(() => {
        const meta = pageMeta[pathname] || {
            title: 'Genapps — AI Website Builder',
            description: 'Build stunning websites with AI. Genapps generates production-ready code from your description.',
        };

        // Update document title
        document.title = meta.title;

        // Update or create meta description
        let descTag = document.querySelector('meta[name="description"]');
        if (!descTag) {
            descTag = document.createElement('meta');
            descTag.name = 'description';
            document.head.appendChild(descTag);
        }
        descTag.content = meta.description;

        // Update or create Open Graph tags
        const ogTags = {
            'og:title': meta.title,
            'og:description': meta.description,
            'og:type': 'website',
            'og:url': window.location.href,
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                document.head.appendChild(tag);
            }
            tag.content = content;
        });
    }, [pathname]);

    return null;
}
