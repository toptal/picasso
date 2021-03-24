FROM node:14-alpine

ENV PATH="${PATH}:/app/node_modules/.bin" \
  # Defines version of dependencies for apk add
  APK_BRANCH=3.10 \
  # Replace when puppetter is replaced with puppeteer-core
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  # Installs Chromium (77) package.
  CHROME_BIN=/usr/bin/chromium-browser

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

# Enables layer caching
COPY --chown=node:node package.json yarn.lock ./

# Copy package.json to restore symlinks in a single yarn install
COPY --chown=node:node packages/picasso/package.json ./packages/picasso/package.json
COPY --chown=node:node packages/picasso-lab/package.json ./packages/picasso-lab/package.json
COPY --chown=node:node packages/picasso-charts/package.json ./packages/picasso-charts/package.json
COPY --chown=node:node packages/picasso-forms/package.json ./packages/picasso-forms/package.json
COPY --chown=node:node packages/shared/package.json ./packages/shared/package.json
COPY --chown=node:node packages/picasso-codemod/package.json ./packages/picasso-codemod/package.json
COPY --chown=node:node packages/topkit-analytics-charts/package.json ./packages/topkit-analytics-charts/package.json

# Install node_modules
RUN yarn install --frozen-lockfile

# COPY sources to workdir
COPY --chown=node:node . /app

# Needed for alpha releases.Must be after yarn install
RUN printf '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\nalways-auth=true\n' > .npmrc
