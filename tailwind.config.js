module.exports = {
  purge: [
    './layouts/**/*.html',
    './content/**/*.md',
    './content/**/*.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          light: '#e9f2f9',
          DEFAULT: '#0b89cc',
        },
      },
      fontFamily: {
        noto: ['Noto Serif', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
