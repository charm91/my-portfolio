import path from 'path';
import { fileURLToPath } from 'url';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {(phase: string) => import('next').NextConfig} */
const nextConfig = (phase) => ({
  outputFileTracingRoot: __dirname,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
});

export default nextConfig;
