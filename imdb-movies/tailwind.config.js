module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: { 
      white: "0px 0px 10px #fff"
    },
    extend: {
      fontFamily: {
        fira: ["Fira Mono"],
        contrail: ["Contrail One"],
        allerta: ["Allerta Stencil"],
        codystar: ["Codystar"],
        squada: ["Squada One"]
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
