/** Tailwind v4 config */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,ts}"],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
