/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A78BFA',
        secondary: '#F9A8D4',
        accent: '#FFFFFF',
        dark: '#0F172A',
      },
      borderRadius: {
        'xl': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'elegant': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      backdropFilter: {
        'glass': 'blur(4px)',
      },
      backgroundImage: {
        'gradient-purple-pink': 'linear-gradient(135deg, #A78BFA 0%, #F9A8D4 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #F5F3FF 0%, #FFF5F9 100%)',
      },
    },
  },
  plugins: [],
}
