/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/assets/hero-pattern.svg')",
        'hero-bg': "url('/assets/hero-bg.svg'),url('/assets/hero-blob.svg')",
        'footer-bg': "url('/assets/footer-bg.svg')",
      },
      colors: {
        'ptgBeige': {
          DEFAULT: "#eee7d4"
        },
        'ptgOrange': {
          DEFAULT: "#D96824"
        },
        'ptgBlue': {
          DEFAULT: "#78B7E1"
        },
        'ptgBrown': {
          DEFAULT: "#5E251B"
        },
        'ptgGrey': {
          DEFAULT: "#3B3B35"
        },
        'ptgGreen': {
          DEFAULT: "#778A3B"
        },
        'ptgRed': {
          DEFAULT: "#B84D24"
        },

      }
    },
  },
  plugins: [],
}
