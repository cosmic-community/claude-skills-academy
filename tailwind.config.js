/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Changed: Anthropic-inspired warm palette
        anthro: {
          50: '#faf9f7',
          100: '#f5f0ea',
          150: '#efe8df',
          200: '#e8ddd1',
          300: '#d5c4ab',
          400: '#c4956a',
          500: '#b8845c',
          600: '#a0704d',
          700: '#85593d',
          800: '#6b4632',
          900: '#4a3020',
          950: '#2d1d14',
        },
        dark: {
          50: '#faf9f7',
          100: '#f5f0ea',
          200: '#e8ddd1',
          300: '#d5c4ab',
          400: '#a89580',
          500: '#8a7560',
          600: '#6b5a48',
          700: '#4a3f33',
          800: '#342c23',
          900: '#231e18',
          950: '#191510',
        },
        primary: {
          50: '#fdf8f3',
          100: '#faeee1',
          200: '#f4d9be',
          300: '#ecc093',
          400: '#d4a574',
          500: '#c4956a',
          600: '#a87a52',
          700: '#8c6343',
          800: '#6f4e36',
          900: '#52392a',
        },
        accent: {
          50: '#f3f6f9',
          100: '#e0e8ef',
          200: '#bfcfde',
          300: '#94afc8',
          400: '#6d8fae',
          500: '#527394',
          600: '#3f5a78',
          700: '#334862',
          800: '#2b3c51',
          900: '#1e2a3a',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};