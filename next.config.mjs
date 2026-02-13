import { fileURLToPath } from "url";
import path from "path";

/** @type {import('next').NextConfig} */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactCompiler: true,

  turbopack: {
    root: __dirname, 
  },
  images: {
    domains: ["res.cloudinary.com","img.clerk.com"],
  },
};

export default nextConfig;
