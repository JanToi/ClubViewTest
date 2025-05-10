// postcss.config.cjs (Corrected way)
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // Use the new package here
    autoprefixer: {},
    // It's important that Tailwind CSS (via @tailwindcss/postcss) runs before autoprefixer
  },
};