const gateways = [
  '/gm/',
  '/ess/',
  '/tester/',
  '/storage/'
];

const filepxyList = ['/storage/'];
const proxy = {};
gateways.every(item => {
  if (filepxyList.includes(item)) {
    proxy[item] = {
      target: 'http://dev-files.xcan.cloud',
      changeOrigin: true
    };
  } else {
    proxy[item] = {
      target: 'http://dev-apis.xcan.cloud',
      changeOrigin: true
    };
  }

  const rex = new RegExp(`^${item}`, 'i');
  switch (item) {
    case '/demo':
      proxy[item].rewrite = (path) => path.replace(rex, '');
      break;
    default:
      proxy[item].rewrite = (path) => path.replace(rex, `/${item}`);
  }
  return true;
});

export default {
  host: '0.0.0.0',
  port: 80,
  strictPort: false,
  open: false,
  proxy,
  allowedHosts: ['dev-host.xcan.cloud'],
};
