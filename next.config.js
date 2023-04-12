/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
 
}
module.exports = {
  images: {
    domains: ['bijouxhair.com', 'res.cloudinary.com', 'cdn.sanity.io'],
  },
  //webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  async redirects() {
    return [
      {
        source: '/site1',
        destination: '/store/6410ab4720f86fbe3cb7652c',
        permanent: true,
      },
      {
        source: '/site2',
        destination: '/store/6410ab4720f86fbe3cb76529',
        permanent: true,
      },
      {
        source: '/site3',
        destination: '/store/6410ab4720f86fbe3cb7652a',
        permanent: true,
      },
      {
        source: '/site4',
        destination: '/store/6410ab4720f86fbe3cb7652e',
        permanent: true,
      },
      {
        source: '/site5',
        destination: '/store/6410ab4720f86fbe3cb7652f',
        permanent: true,
      },
      {
        source: '/site6',
        destination: '/store/6410ab4720f86fbe3cb76530',
        permanent: true,
      },
      {
        source: '/site7',
        destination: '/store/6410ab4720f86fbe3cb76528',
        permanent: true,
      },
      {
        source: '/site8',
        destination: '/store/6410ab4720f86fbe3cb76525',
        permanent: true,
      },
      {
        source: '/site9',
        destination: '/store/6410ab4720f86fbe3cb76527',
        permanent: true,
      },
      {
        source: '/site10',
        destination: '/store/6410ab4720f86fbe3cb7652d',
        permanent: true,
      },
      {
        source: '/site11',
        destination: '/store/6410ab4720f86fbe3cb76526',
        permanent: true,
      },
      {
        source: '/site12',
        destination: '/store/6410ab4720f86fbe3cb7652b',
        permanent: true,
      },
     
    ]
  },
}