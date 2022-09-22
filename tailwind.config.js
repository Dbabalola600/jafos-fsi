/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes:[
      {
        myTheme: {
          primary: "rgba(128,0,128,0.8)" 
        }
      }
    ]
  },

  theme: {
    extend: {
      colors: {
        primaryColour: "rgba(128,0,128,0.8)"
      },
    },
  },
  plugins: [require("daisyui")]
}
