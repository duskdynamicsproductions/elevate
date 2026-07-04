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
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
