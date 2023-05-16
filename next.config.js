/** @type {import('next').NextConfig} */
const path = require("path");
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./src/styles/style-resources.scss";`,
  },
  i18n,
};

module.exports = nextConfig;
