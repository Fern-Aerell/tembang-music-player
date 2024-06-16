/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        baseUrl: 'http://localhost:3000',
    },
    images: {
        remotePatterns: [
            {
                hostname: 'localhost'
            }
        ]
    }
};

export default nextConfig;
