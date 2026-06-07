/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0B0F1A', 2: '#111827', 3: '#1a2035' },
        gold: { DEFAULT: '#FFD54F', dark: '#FFA726' },
        green: { DEFAULT: '#00E676', dark: '#00C853' },
        red: { DEFAULT: '#FF5252', dark: '#D32F2F' },
        glass: { DEFAULT: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
