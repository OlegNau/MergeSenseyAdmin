/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--accordion-content-height, 0)' } },
        'accordion-up':   { from: { height: 'var(--accordion-content-height, 0)' }, to: { height: '0' } },
        'fade-in':        { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-out':       { from: { opacity: '1' }, to: { opacity: '0' } },
        'slide-in-from-top':    { from: { transform: 'translateY(-8px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'slide-out-to-top':     { from: { transform: 'translateY(0)', opacity: '1' }, to: { transform: 'translateY(-8px)', opacity: '0' } },
        'slide-in-from-bottom': { from: { transform: 'translateY(8px)', opacity: '0' },  to: { transform: 'translateY(0)', opacity: '1' } },
        'slide-out-to-bottom':  { from: { transform: 'translateY(0)', opacity: '1' },   to: { transform: 'translateY(8px)', opacity: '0' } },
        'slide-in-from-left':   { from: { transform: 'translateX(-8px)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        'slide-out-to-left':    { from: { transform: 'translateX(0)', opacity: '1' },    to: { transform: 'translateX(-8px)', opacity: '0' } },
        'slide-in-from-right':  { from: { transform: 'translateX(8px)', opacity: '0' },  to: { transform: 'translateX(0)', opacity: '1' } },
        'slide-out-to-right':   { from: { transform: 'translateX(0)', opacity: '1' },    to: { transform: 'translateX(8px)', opacity: '0' } },
        'zoom-in-95':     { from: { transform: 'scale(.95)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
        'zoom-out-95':    { from: { transform: 'scale(1)', opacity: '1' },   to: { transform: 'scale(.95)', opacity: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-in':        'fade-in 150ms ease-out',
        'fade-out':       'fade-out 150ms ease-in',
        'slide-in-from-top':    'slide-in-from-top 200ms ease-out',
        'slide-out-to-top':     'slide-out-to-top 200ms ease-in',
        'slide-in-from-bottom': 'slide-in-from-bottom 200ms ease-out',
        'slide-out-to-bottom':  'slide-out-to-bottom 200ms ease-in',
        'slide-in-from-left':   'slide-in-from-left 200ms ease-out',
        'slide-out-to-left':    'slide-out-to-left 200ms ease-in',
        'slide-in-from-right':  'slide-in-from-right 200ms ease-out',
        'slide-out-to-right':   'slide-out-to-right 200ms ease-in',
        'zoom-in-95':           'zoom-in-95 150ms ease-out',
        'zoom-out-95':          'zoom-out-95 150ms ease-in',
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        sidebar: {
          bg: "#0B1220",
        },
        chart: {
          grid: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
