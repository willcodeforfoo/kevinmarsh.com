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
          dark: '#313743'
        },
      },
    },
    fontFamily: {
      noto: ['Noto Serif', 'serif'],
      mono: ['Source Code Pro', 'monospace'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
