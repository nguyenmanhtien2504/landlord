/*
* @type {import('next').NextConfig} 
*/

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: false,
  env: {
    API_URL: "http://localhost:4000/api",
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts/', // Thay đổi đường dẫn lưu trữ tệp font
        },
      },
    });
    return config;
  },
});
