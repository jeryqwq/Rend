import { defineConfig } from 'umi';
import routers from './src/routers/index'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  routes: routers,
  fastRefresh: {},
  mfsu:{},
  locale:{},
  theme: {
    '@primary-color': '#0e5ecc',
  },
});
