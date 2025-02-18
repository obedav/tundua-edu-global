/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"  // This covers all js/ts files in src and subdirectories
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
      },
      height: {
        navbar: '4rem'
      }
    },
  },
  plugins: [],
}