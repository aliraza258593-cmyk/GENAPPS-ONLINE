/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            colors: {
                brand: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                sky: {
                    light: '#e8f4fd',
                    DEFAULT: '#bae6fd',
                    mist: '#f0f7ff',
                },
                cloud: {
                    50: '#f8faff',
                    100: '#f0f4ff',
                    200: '#e8eeff',
                    white: 'rgba(255,255,255,0.75)',
                },
                lavender: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                },
                surface: {
                    DEFAULT: '#f8faff',
                    card: 'rgba(255,255,255,0.6)',
                    glass: 'rgba(255,255,255,0.45)',
                },
            },
            boxShadow: {
                'glass': '0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
                'glass-lg': '0 16px 48px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                'glass-sm': '0 4px 16px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)',
                'soft': '0 2px 20px rgba(14,165,233,0.08)',
                'soft-lg': '0 8px 40px rgba(14,165,233,0.12)',
                'card-hover': '0 20px 60px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.06)',
                'btn': '0 4px 14px rgba(14,165,233,0.25)',
                'btn-hover': '0 8px 24px rgba(14,165,233,0.35)',
                'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.6)',
            },
            borderRadius: {
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'cloud-drift': 'cloud-drift 25s ease-in-out infinite',
                'cloud-drift-reverse': 'cloud-drift 30s ease-in-out infinite reverse',
                'soft-bounce': 'soft-bounce 3s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
                'slide-up': 'slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'shimmer': 'shimmer 2s linear infinite',
                'gradient-shift': 'gradient-shift 8s ease infinite',
                'marquee': 'marquee 30s linear infinite',
                'marquee-reverse': 'marquee 30s linear infinite reverse',
                'marquee-slow': 'marquee 45s linear infinite',
                'spin-slow': 'spin 20s linear infinite',
                'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
                'fade-in': 'fade-in 0.6s ease-out forwards',
                'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'glass-shimmer': 'glass-shimmer 3s ease-in-out infinite',
                'blink': 'blink 1s step-end infinite',
                'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-in-bottom': 'slide-in-bottom 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'sparkle': 'sparkle 3s ease-in-out infinite',
            },
            keyframes: {
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'cloud-drift': {
                    '0%': { transform: 'translateX(0) translateY(0)' },
                    '33%': { transform: 'translateX(30px) translateY(-10px)' },
                    '66%': { transform: 'translateX(-20px) translateY(5px)' },
                    '100%': { transform: 'translateX(0) translateY(0)' },
                },
                'soft-bounce': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '0.6' },
                    '50%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'marquee': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'bounce-subtle': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(24px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'glass-shimmer': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'blink': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
                'reveal': {
                    '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
                'slide-in-bottom': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'sparkle': {
                    '0%, 100%': { opacity: '0', transform: 'scale(0)' },
                    '50%': { opacity: '1', transform: 'scale(1)' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'sky-gradient': 'linear-gradient(180deg, #e0f2fe 0%, #f0f7ff 30%, #f8faff 60%, #ffffff 100%)',
                'hero-sky': 'linear-gradient(180deg, #bae6fd 0%, #e0f2fe 25%, #f0f7ff 50%, #f8faff 100%)',
                'section-soft': 'linear-gradient(180deg, #f8faff 0%, #f0f4ff 50%, #f8faff 100%)',
            },
        },
    },
    plugins: [],
}
