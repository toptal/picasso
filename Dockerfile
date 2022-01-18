FROM node:14-alpine

ENV PATH="${PATH}:/app/node_modules/.bin" \
  # Defines version of dependencies for apk add
  APK_BRANCH=3.10 \
  # Replace when puppetter is replaced with puppeteer-core
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  # Installs Chromium (77) package.
  CHROME_BIN=/usr/bin/chromium-browser \
  # We don't pass real value here, workaround to bypass npm check on from .npmrc
  NPM_TOKEN=''

RUN printf "http://nl.alpinelinux.org/alpine/v$APK_BRANCH/%s\n" community main > /etc/apk/repositories && \
  apk add --no-cache \
  harfbuzz \
  nss \
  git \
  curl \
  jq \
  chromium \
  openssh-client \
  bash \
  sed \
  shadow

# Change default 'node' user id to match jenkins CI user id
# so when we will be running container from CI it would have
# all necessary rights for npm/yarn publish
RUN groupmod -g 469 node && usermod -u 469 -g 469 node

WORKDIR /app

# Fix permissions to a workdir
RUN chown -R node /app

USER node

# COPY sources to workdir
COPY --chown=node:node . /app

# Install node_modules
RUN yarn install --immutable
