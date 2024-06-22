/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/auth/signup",
                destination: "/sign-up",
            },
        ]
    },
    async redirects() {
        return [
            {
                source: "/sign-up",
                destination: "/auth/signup",
                permanent: true,
            },
        ]
    },
}

export default nextConfig
