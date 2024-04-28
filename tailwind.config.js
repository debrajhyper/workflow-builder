/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1B192B",
        text: "#f8f8f2",
        border: "#333154",
        card: "#333154",
        previewBackground: "#4caf5030",
        previewBorder: "#4caf50",
        exportButton: "#333154",
        exportButtonMenu: "#2d3748",
        exportButtonMenuHover: "#ffffff14",
      },
    },
  },
  plugins: [],
}

