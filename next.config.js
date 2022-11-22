/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'github.githubassets.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    appDir: true,
  },
}
