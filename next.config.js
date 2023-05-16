/** @type {import('next').NextConfig} */
const path = require("path");
const { i18n } = require("./next-i18next.config");
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "./src/styles/style-resources.scss";`,
  },
  i18n,
  publicRuntimeConfig: {
    apiURL: process.env.API_URL || "https://api.comony.net",
  },
};

module.exports = nextConfig;
