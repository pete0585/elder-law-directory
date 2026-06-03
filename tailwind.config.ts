import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          slate: '#2B4C7E',
          'slate-dark': '#1A3460',
          'slate-light': '#3D6499',
          amber: '#C8882A',
          'amber-light': '#E0A040',
          'amber-dark': '#A06B1A',
          warm: '#FAF8F5',
        },
        surface: {
          DEFAULT: '#FAF8F5',
          card: '#FFFFFF',
          border: '#E8E2D9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
