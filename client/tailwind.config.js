const purgecss = require("@fullhuman/postcss-purgecss")({
  // paths to all of the template files in the project
  content: ["./src/**/*.html", "./src/**/*.tsx", "./public/**/*.html"],

  // default extractor including tailwind's special characters
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  purge: [],
  // purge: {
  // content: ["./src/pages/pages/**/*.{js,tsx}"],
  // enabled: true,
  // },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      inherit: "inherit",
      none: "none",
      2: "2 2 0%",
      "1/2": "0.5",
      "1/3": "0.33",
      "2/3": "0.63",
    },
    extend: {
      animation: {
        slideDown: "slideDown .3s ease-in",
        slideUp: "slideUp .3s ease-out",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    "tailwindcss",
    [
      "postcss-preset-env",
      {
        stage: 1,
        features: {
          "focus-within-pseudo-class": false,
        },
      },
    ],
  ],
};
