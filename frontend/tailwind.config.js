/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Animazioni personalizzate per effetti narrativi
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      // Definizioni delle animazioni
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      // Colori tematici per FEDACS
      colors: {
        'fedacs': {
          // Colori per le 4 forze FEDACS
          'virtue': '#3B82F6',      // Blu - Virtù (V)
          'selfishness': '#EF4444', // Rosso - Egoismo (S)
          'reason': '#10B981',      // Verde - Ragione (R)
          'chaos': '#8B5CF6',       // Viola - Caos (C)
          // Forze risultanti
          'alpha': '#F59E0B',       // Ambra - Forza α (ordine/struttura)
          'beta': '#EC4899',        // Rosa - Forza β (cambiamento/flusso)
          // Utilità
          'dark': '#1E293B',
          'darker': '#0F172A',
          'light': '#F8FAFC',
        },
        // Gradienti tematici per personaggi
        'character': {
          'sage': 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
          'rebel': 'linear-gradient(135deg, #EF4444 0%, #8B5CF6 100%)',
          'diplomat': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
          'visionary': 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
        }
      },
      // Font personalizzati (se necessario)
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      // Ombre personalizzate
      boxShadow: {
        'fedacs': '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'fedacs-lg': '0 20px 40px -10px rgba(0, 0, 0, 0.25), 0 15px 20px -15px rgba(0, 0, 0, 0.15)',
        'fedacs-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      // Border radius personalizzati
      borderRadius: {
        'fedacs': '0.75rem',
        'fedacs-lg': '1rem',
        'fedacs-xl': '1.5rem',
      },
      // Gradienti personalizzati
      backgroundImage: {
        'fedacs-gradient': 'linear-gradient(135deg, #3B82F6 0%, #10B981 50%, #8B5CF6 100%)',
        'alpha-gradient': 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
        'beta-gradient': 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
      },
    },
  },
  plugins: [],
}
