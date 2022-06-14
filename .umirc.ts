import { defineConfig } from 'umi';
import routers from './src/routers/index'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routers,
  history: { type: 'hash' },
  fastRefresh: {},
  mfsu:{},
  locale:{},
  theme: {
    '@primary-color': '#0e5ecc',
  },
  proxy: {
    '/login': {
      'target': 'http://121.204.145.151:44001/',
      'changeOrigin': true,
    }
  }
});
