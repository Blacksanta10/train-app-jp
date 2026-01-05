/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      /**
       * These only hold the most important and most reused colors
       * bg-(any-color defined)
       */
      colors: {
        background: "var(--color-bg)",
        "nav-bg": "var(--color-nav-bg)",
        foreground: "var(--color-text)",
        muted: "var(--color-text-muted)",
        accent: "var(--color-accent)",
        border: "var(--color-border)",

        primary: "var(--color-primary)",
        error: "var(--color-error)",
      }
    },
  },
  plugins: [],
}

