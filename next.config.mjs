/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {'net':false,'tls':false, 'child_process': false };
        return config;
      },
    images: {
        domains: ['images.unsplash.com'],
    },
};

export default nextConfig;
