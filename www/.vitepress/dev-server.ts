const proxy = {
  '/gm/': {
    target: 'https://dev-apis.xcan.cloud',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/gm\//i, '/gm/')
  },
  '/ess/': {
    target: 'https://dev-apis.xcan.cloud',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/ess\//i, '/ess/')
  },
  '/tester/': {
    target: 'https://dev-apis.xcan.cloud',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/tester\//i, '/tester/')
  },
  '/storage/': {
    target: 'https://dev-files.xcan.cloud',
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
