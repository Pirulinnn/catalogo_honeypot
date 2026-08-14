/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
            },
            borderRadius: {
                DEFAULT: 'var(--radius)',
                sm: 'calc(var(--radius) - 0.25rem)',
                md: 'var(--radius)',
                lg: 'calc(var(--radius) + 0.25rem)',
                xl: 'calc(var(--radius) + 0.5rem)',
                '2xl': 'calc(var(--radius) + 0.75rem)',
                '3xl': 'calc(var(--radius) + 1.25rem)',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                display: ['var(--font-display)', 'serif'],
            },
            boxShadow: {
                rustic: '0 2px 12px rgba(59, 35, 20, 0.07), 0 1px 3px rgba(59, 35, 20, 0.05)',
                'rustic-hover': '0 8px 32px rgba(59, 35, 20, 0.12), 0 2px 8px rgba(59, 35, 20, 0.08)',
                amber: '0 4px 14px rgba(217, 119, 6, 0.35)',
                'amber-hover': '0 8px 24px rgba(217, 119, 6, 0.45)',
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                shimmer: 'shimmer 2s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-8px) rotate(1deg)' },
                    '66%': { transform: 'translateY(-4px) rotate(-1deg)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};