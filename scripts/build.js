/* eslint-disable no-template-curly-in-string */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2); // Remove node and script path
console.log('> args: ', args);

const params = {};
for (const arg of args) {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    params[key] = value || true;
  }
}
const deployEnv = params.env;
console.log('> deployEnv: ', deployEnv);

function resolve (p) {
  return path.join(__dirname, p);
}

function start () {
  console.log('> Copy the nginx configuration file to the public/');
  const nginxContent = fs.readFileSync(resolve(`../nginx/nginx_${deployEnv}_www.conf`), 'utf8');
  fs.writeFileSync(resolve(`../public/nginx_${deployEnv}_www.conf`), nginxContent, 'utf8');

  execSync(`npm run docs:build`, { stdio: 'inherit' });
}

start();
