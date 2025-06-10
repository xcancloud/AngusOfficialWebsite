#!/bin/sh

# ---------------------------------------------------------------------------
# Jenkins CI/CD Pipeline Script for AngusGM Project.
# Usage: sh cicd.sh --env env.dev --hosts 127.0.0.1
# Author: XiaoLong Liu
# ---------------------------------------------------------------------------

# Global Variables
REMOTE_APP_DIR="/data/apps/AngusOfficialWebsite"

REMOTE_APP_STATIC_DIR="${REMOTE_APP_DIR}"

NGINX_CONFIG_DIR="/etc/nginx/conf.d"

# Validate input parameters
validate_parameters() {
  # Validate mandatory parameters
  if [ -z "$env" ]; then
    echo "ERROR: Missing required parameters (env)"
    exit 1
  fi
}

# Check and clean environment
prepare_environment() {
  echo "INFO: Preparing build environment..."

  # Load system profile for environment variables
  if [ -f "/etc/profile" ]; then
    echo "INFO: Loading system environment variables"
    . /etc/profile
  fi

  echo "INFO: Checking Node.js environment"
  if ! command -v node >/dev/null || ! command -v npm >/dev/null; then
    echo "ERROR: Node.js/npm not found"; exit 1
  fi
  echo "INFO: Cleaning npm cache"
  npm cache clean --force
}

# Build web module
npm_build () {
  echo "INFO: npm install start"
  npm install

  if [ $? -ne 0 ]; then
    echo "ERROR: 'npm install --no-optional --legacy-peer-deps' failed, exiting script"
    exit 1
  fi
  echo "INFO: npm install end"

  echo "INFO: npm run docs:build start"
  npm run docs:build
  if [ $? -ne 0 ]; then
    echo "ERROR: 'npm run docs:build' failed, exiting script"
    exit 1
  fi
  echo "INFO: npm build end"
}

# Deploy web module
deploy_web() {
  echo "INFO: Deploying web module to ${host}"
  ssh "$host" "mkdir -p ${REMOTE_APP_STATIC_DIR} && rm -rf ${REMOTE_APP_STATIC_DIR}/*" || {
    echo "ERROR: Failed to clean static directory"; exit 1
  }
  scp -rp "dist"/* "${host}:${REMOTE_APP_STATIC_DIR}/" || {
    echo "ERROR: Failed to copy web assets"; exit 1
  }
  nginxFileName="nginx/nginx_${env##*.}_www.conf"
  scp -p ${nginxFileName} "${host}:${NGINX_CONFIG_DIR}/" || {
    echo "ERROR: Failed to copy web assets"; exit 1
  }
  ssh "$host" "mv -f ${REMOTE_APP_STATIC_DIR}/nginx_${env##*.}_*.conf ${NGINX_CONFIG_DIR}/" || {
    echo "ERROR: Failed to clean static directory"; exit 1
  }
  ssh "$host" "nginx -s reload" || {
    echo "ERROR: Failed to reload nginx"; exit 1
  }
}

ci(){
    echo "INFO: Building web module"
    npm_build || {
      echo "ERROR: Web build failed"; exit 1
    }
    cd ..
}

cd(){
  if [ -n "$hosts" ]; then
    echo "INFO: Starting deployment to hosts: ${hosts}"
    IFS=',' read -ra HOST_LIST <<EOF
$hosts
EOF
    for host in "${HOST_LIST[@]}"; do
        deploy_web
    done
  else
    echo "INFO: No hosts specified, skipping deployment"
  fi
}

cicd(){
  ci
  cd
}

# Main execution flow
while [ $# -gt 0 ]; do
  case "$1" in
    --env) env="$2"; shift ;;
    --hosts) hosts="$2"; shift ;;
    *) echo "WARN: Unknown parameter $1"; shift ;;
  esac
  shift
done

# Step 1: Parameter validation
validate_parameters

# Step 2: Environment preparation
prepare_environment

# Step 3: CI and CD Phase
cicd

echo "SUCCESS: CI/CD pipeline completed successfully"
exit 0
