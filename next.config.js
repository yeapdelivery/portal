/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "yeap-delivery.s3-us-east-2.amazonaws.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "s.gravatar.com",
    ],
  },
};

module.exports = nextConfig;
