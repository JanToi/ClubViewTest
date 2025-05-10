/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Scans your src folder
      "./components/**/*.{js,ts,jsx,tsx}", // Make sure to include your components folder
      // Add any other paths where you use Tailwind classes
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };