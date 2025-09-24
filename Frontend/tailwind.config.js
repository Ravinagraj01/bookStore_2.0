/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // Enables dark mode using 'dark' class
    theme: {
      extend: {
        colors: {
          dark1: "#0a0a0a", // Near black
          dark2: "#1f1f1f", // Dark gray
          dark3: "#2a2a2a", // Softer gray
          neonBlue: "#00b4d8", // Electric blue
          neonPink: "#ff007f", // Vibrant pink
        },
        backgroundImage: {
          'dark-gradient': "linear-gradient(to bottom right, #0a0a0a, #1f1f1f, #2a2a2a)",
        },
      },
    },
    plugins: [require("daisyui")],
  };
  
