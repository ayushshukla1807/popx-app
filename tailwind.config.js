/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#d2c4f8',
          DEFAULT: '#6c25ff',
          dark: '#5a1fd1',
        },
        gray: {
          50: '#f7f8f9',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#4b5563',
          600: '#374151',
          700: '#1f2937',
          800: '#111827',
          900: '#030712',
        }
      },
    },
  },
  plugins: [],
}
