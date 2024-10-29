/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "xxs-b": "339px",
        "xs-b": "576px",
        "md-b": "768px",
        "lg-b": "992px",
        "xl-b": "1200px",
        "2xl-b": "1400px",

        //old max width
        // "sm": { max: "640px" }, // max width
        // "md": { max: "768px" }, // max width
        // "lg": { max: "1024px" }, // max width
        // "xl": { max: "1280px" },
        // "2xl": { max: "1536px" },
        // "3xl": { max: "1920px" },
        // "4xl": { max: "2560px" },

        // // max width
        //  "mxs-b": { max: "575px" },
        //  "mmd-b": { max: "767px" },
        //  "mlg-b": { max: "991px" },
      },
      color: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
      },

      // boxShadow: {
      //   panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      // },

      boxShadow: {
        sh: "0 0 0 0.25rem rgb(13 110 253 / 25%)",
        input: "0 1px 2px 0 #1018280d",
        "md-custom": "0px 6px 15px rgba(64, 79, 104, 0.05)",
        sdp: "0 6px 15px rgb(64 79 104 / 5%)",
        na: "0 6px 15px rgb(26 26 26 / 19%)",
      },
      boxshadow: {
        bshadow:
          "inset 0 0 0 0px #fff, inset 0 0 0 1px rgb(209 213 219 / 1), 0 0 #000",
      },
      minHeight: {
        "minus-72": "calc(100vh - 72px)",
      },
    },
  },
  /*  plugins: [
    require("daisyui"),
    {
      daisyui: {
        themes: ["light"], // Add your desired themes here
      },
    },
  ],*/
};
