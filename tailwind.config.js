/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'elevate-orange': '#FF6200',
        'elevate-orange-light': '#FF8A00',
        'elevate-cream': '#F2EDE6',
        'elevate-cream-dark': '#E8E2DA',
        'elevate-dark': '#0F1012',
        'elevate-black': '#0C0B0B',
        'elevate-paper': '#FDFCFA',
        'elevate-blue': '#1D4ED8',
        'elevate-blue-light': '#3B82F6',
        'elevate-green': '#1ED760',
        'elevate-green-deep': '#158A3E',
      },
      fontFamily: {
        'display': ['GS', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        'marquee': 'marquee 28s linear infinite',
        'bounce-realistic': 'bounce-realistic 0.7s infinite',
        'squash-stretch': 'squash-stretch 0.7s infinite',
        'shadow-pulse': 'shadow-pulse 0.7s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'bounce-realistic': {
          '0%, 100%': { transform: 'translateY(-100px)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'squash-stretch': {
          '0%, 40%, 100%': { transform: 'scale(1, 1)' },
          '48%': { transform: 'scale(0.85, 1.15)' },
          '50%': { transform: 'scale(1.4, 0.6)' },
          '52%': { transform: 'scale(0.85, 1.15)' },
          '60%': { transform: 'scale(1, 1)' },
        },
        'shadow-pulse': {
          '0%, 100%': { transform: 'scale(0.4)', opacity: '0.1', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'scale(1)', opacity: '0.5', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
    },
  },
  plugins: [],
}
