import path from 'node:path';
import { fileURLToPath } from 'node:url';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import swc from '@rollup/plugin-swc';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, Plugin } from 'vite';
import viteCompression from 'vite-plugin-compression';
import dts from 'vite-plugin-dts';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import pkg from './package.json';

// Resolve __dirname in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine production mode and sourcemap option
const isProduction = process.env.NODE_ENV === 'production';
const sourcemapOption = isProduction ? false : true;

// Terser options to drop console and debugger in production
const terserOptions = {
  compress: {
    drop_console: true,
    drop_debugger: true,
  },
};

// Custom plugin to add .js extension to relative import paths
function addExtensionPlugin(): Plugin {
  return {
    name: 'add-extension-plugin',
    enforce: 'post',
    transform(code, id) {
      // Only process TS/JS files in the src folder
      if (id.includes('/src/') && (id.endsWith('.ts') || id.endsWith('.js'))) {
        // Regex to match relative imports without extension
        // It matches import/export statements and dynamic imports
        return code.replace(
          /((?:import|export)(?:\s+.*?\s+from\s+|[\(]\s*)['"](\.\/[^'"]+)(?<!\.js)(['"]))/g,
          (_, p1, p2, p3) => `${p1}${p2}.js${p3}`,
        );
      }
      return code;
    },
  };
}

const basePlugins = [
  // Resolve paths defined in tsconfig.json
  viteTsconfigPaths(),
  // Externalize peerDependencies automatically
  peerDepsExternal(),
  // Resolve Node modules, preferring built-ins
  nodeResolve({
    extensions: ['.ts', '.js', '.json'],
    preferBuiltins: true,
  }),
  // Allow JSON imports
  json(),
  // Replace process.env.NODE_ENV for proper tree-shaking
  replace({
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development',
    ),
    preventAssignment: true,
  }),
  // Use SWC for TypeScript transformation and minification
  swc({
    swc: {
      jsc: {
        parser: { syntax: 'typescript', tsx: false },
        target: 'es2022',
        minify: isProduction ? { compress: true, mangle: true } : undefined,
      },
      module: { type: 'es6' },
    },
  }),
].filter(Boolean);

// Optional plugin: Visualizer to analyze bundle size
const analyzePlugin = process.env.ANALYZE
  ? visualizer({
      open: true,
      filename: path.resolve(__dirname, 'stats.html'),
      gzipSize: true,
      brotliSize: true,
    })
  : null;

export default defineConfig({
  build: {
    ssr: true, // Enable SSR mode for Node built-ins bundling
    target: 'node22',
    sourcemap: sourcemapOption,
    // Use Terser for production minification with custom options
    minify: isProduction ? 'terser' : false,
    terserOptions: isProduction ? terserOptions : {},
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'nspin-esm',
      // Only generate ESM output
      formats: ['es'],
      // Always output as "index.mjs"
      fileName: () => 'index.mjs',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true, // Inline dynamic imports for CLI simplicity
        assetFileNames: 'assets/[name].[hash].[ext]',
        entryFileNames: 'index.mjs',
      },
      treeshake: {
        moduleSideEffects: false,
      },
      // Externalize peerDependencies to avoid bundling them
      external: (id: string) =>
        Object.keys(pkg.peerDependencies || {}).some(
          (dep) => id === dep || id.startsWith(`${dep}/`),
        ),
    },
  },
  ssr: {
    noExternal: ['util', 'perf_hooks'], // Do not externalize these native modules
  },
  resolve: {
    alias: {
      // Map Node built-in modules using node: prefix to their native counterparts
      'node:util': 'util',
      'node:perf_hooks': 'perf_hooks',
    },
  },
  plugins: [
    ...basePlugins,
    addExtensionPlugin(), // Custom plugin to fix import paths
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
    analyzePlugin,
    dts({
      outDir: 'dist',
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ].filter(Boolean),
});
