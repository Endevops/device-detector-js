import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: true,
  exports: true,
  platform: 'node',
  sourcemap: true,
  unbundle: true,
  checks: {
    circularDependency: true,
  },
  name: 'device-detector-js',
  unused: true,
  publint: true,
  attw: true,
  // ...config options
});
