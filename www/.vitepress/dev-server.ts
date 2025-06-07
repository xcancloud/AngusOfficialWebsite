const proxy = {
  '/gm/': {
    target: 'http://dev-apis.xcan.cloud',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/gm\//i, '/gm/')
  },
  '/ess/': {
    target: 'http://dev-apis.xcan.cloud',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/ess\//i, '/ess/')
  },
  '/tester/': {
    target: 'http://dev-apis.xcan.cloud',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/tester\//i, '/tester/')
  },
  '/storage/': {
    target: 'http://dev-files.xcan.cloud',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/storage\//i, '/storage/')
  }
};

export default {
  host: '0.0.0.0',
  port: 80,
  strictPort: false,
  open: false,
  proxy,
  allowedHosts: ['dev-host.xcan.cloud']
};
