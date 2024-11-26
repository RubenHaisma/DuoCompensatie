/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        duo: {
          blue: '#154273',
          orange: '#e17000',
          'light-blue': '#f2f7fc',
          'dark-blue': '#0c2b4e',
          gray: '#595959',
        },
      },
      fontFamily: {
        sans: ['RijksoverheidSans', 'Arial', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};