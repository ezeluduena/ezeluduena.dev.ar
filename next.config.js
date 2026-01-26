const { spawnSync } = require('child_process');

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
  experimental: {
    turbopack: false,
  },
  images: {
    unoptimized: true,
  },

  // Pulling donations takes a very long time, so we need to make sure we don't time out too early
  staticPageGenerationTimeout: 60 * 60,

  env: {
    BUILD_ID: [
      spawnSync('git', ['rev-parse', '--short', 'HEAD']).stdout.toString().trim(),
      spawnSync('git', ['tag', '--points-at', 'HEAD']).stdout.toString().trim()
    ]
      .filter(Boolean)
      .join('-'),

    SITE_URL:
      process.env.SITE_URL ||
      (process.env.VERCEL_URL && 'https://' + process.env.VERCEL_URL) ||
      'http://localhost:3000'
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,

      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:8].[ext]',
        },
      },

    });

    return config;
  },

};

module.exports = config;
