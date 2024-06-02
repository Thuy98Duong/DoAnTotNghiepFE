/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_ENDPOINT: process.env.SERVER_ENDPOINT,
    },
    images : {
        domains : ['i.pinimg.com'] // <== Domain name
      }
};

export default nextConfig;
