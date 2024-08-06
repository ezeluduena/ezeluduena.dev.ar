const { spawnSync } = require('child_process');

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  reactStrictMode: true,
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

};

module.exports = config;
