/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.{ejs,html,js}",
    "./public/**/*.js"
  ],
  safelist: [
    'font-inter',
    'font-sans',
    'font-medium',
    'font-bold',
    'font-extrabold',
    'text-primary-600',
    'hover:text-primary-500',
    'bg-primary-600',
    'hover:bg-primary-700',
    'focus:ring-primary-500',
    'border-primary-500',
    'bg-primary-50',
    'text-red-400',
    'text-red-700',
    'bg-red-50',
    'border-red-400'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
