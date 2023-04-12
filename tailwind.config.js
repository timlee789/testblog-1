/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodyFont: "Poppins",
        titleFont: "Montserrat",
      },
      colors: {
        primaryColor: "#111111",
        secondaryColor: "#9b59b6",
        bgColor: "#34495e",
      },
      boxShadow: {
        btnShadow: "0px 0px 18px 3px rgba(52,73,94,1)",
      },
      height: {
        '128': '28rem',
      },
      width: {
        '128': '80rem',
        '99' : '70rem',
      },
    },
    screens: {
      'mobile': '360px',
      'xs': '360px',
      // => @media (min-width: 270px) { ... }

      'tablet': '640px',
      'md': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  
  plugins: [],
};
