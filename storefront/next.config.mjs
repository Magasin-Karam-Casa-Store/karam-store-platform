// Kept as .mjs rather than .ts on purpose: loading a TypeScript config requires
// the native SWC binary, which Windows Application Control blocks on some
// machines. Next then falls back to the WASM build and fails to parse the
// config at all. Plain ESM is loaded directly and works everywhere.

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "karamtech.ma" },
      { protocol: "http", hostname: "karamtech.ma" },
      // Free editorial photography used for hero and category artwork.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
