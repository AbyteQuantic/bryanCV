/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    // localeDetection: true,
  },
  
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  sassOptions: {
    includePaths: ['./styles'],
    // prependData: `@import "./styles/variables.scss";`,
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.next/**'],
      };
    }
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './styles'),
      '@public': path.resolve(__dirname, './public'),
    };
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    
    return config;
  },
  
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  },
  
  env: {
    SITE_URL: process.env.SITE_URL || 'http://localhost:4000',
  },
  // output: 'standalone', // Para Docker deployments
};

const path = require('path');
module.exports = nextConfig;