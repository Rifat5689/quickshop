/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#f8fafc',
        bg2: '#ffffff',
        bg3: '#f1f5f9',
        text: '#0f172a',
        text2: '#475569',
        text3: '#94a3b8',
        accent: '#6366f1',
        accent2: '#818cf8',
        green: '#10b981',
        amber: '#f59e0b',
        red: '#f43f5e',
        teal: '#14b8a6',
      },
      fontFamily: {
        geist: ['Geist', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 3px rgba(99, 102, 241, 0.2)',
      },
    },
  },
  plugins: [],
}
