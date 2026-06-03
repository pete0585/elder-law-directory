import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fbuqrnzofktepkzyfmhy.supabase.co' },
    ],
  },
}

export default nextConfig
