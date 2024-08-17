/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = {'net':false,'tls':false, 'child_process': false };
        return config;
      },
};

export default nextConfig;
