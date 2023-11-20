/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: "Heebo",
        lobster: "Lobster",
        poppins: "Poppins",
        roboto: "Roboto",
        tungsten: "Tungsten",
        monumentRegular: "Monument-regular",
        monumentBold: "Monument-bold",
        satoshi: "Satoshi",
        gilroy1: ["Gilroy-1", "sans-serif"],
        gilroy2: ["Gilroy-2", "sans-serif"],
        gilroy3: ["Gilroy-3", "sans-serif"],
        gilroy4: ["Gilroy-4", "sans-serif"],
        gilroy5: ["Gilroy-5", "sans-serif"],
        gilroy6: ["Gilroy-6", "sans-serif"],
        gilroy7: ["Gilroy-7", "sans-serif"],
        gilroy8: ["Gilroy-8", "sans-serif"],
        gilroy9: ["Gilroy-9", "sans-serif"],
      },
    },
  },
  plugins: [],
};
