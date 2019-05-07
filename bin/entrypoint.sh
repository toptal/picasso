#!/usr/bin/env sh

# Add local user
# Either use the LOCAL_USER_ID if passed in at runtime or
# fallback

USER_ID=${LOCAL_USER_ID:-9001}

echo "Starting with UID : $USER_ID"
echo "Chromium version: $($CHROME_BIN --version)"
adduser --shell /bin/bash -u $USER_ID -h puppeteer -D puppeteer
export HOME=/home/puppeteer

su-exec user "$@"
