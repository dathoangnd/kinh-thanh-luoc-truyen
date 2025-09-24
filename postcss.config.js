module.exports = ({ env }) => ({
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
    ...(env === 'production' ? { cssnano: { preset: 'default' } } : {})
  }
});