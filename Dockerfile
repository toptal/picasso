FROM node:14-alpine

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ARG GIT_SHA
ENV GIT_SHA ${GIT_SHA}

ARG APK_BRANCH=3.10
ENV APK_BRANCH ${APK_BRANCH}

# Lerna uses GH_TOKEN name https://github.com/lerna/lerna/blob/main/commands/version/README.md#--create-release-type
ENV GH_TOKEN ${GITHUB_TOKEN}

ENV PATH="${PATH}:/app/node_modules/.bin"

# TODO replace with puppeteer-core
ARG PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD ${PUPPETEER_SKIP_CHROMIUM_DOWNLOAD}

# Installs Chromium (77) package.
ENV CHROME_BIN /usr/bin/chromium-browser

RUN echo $APK_BRANCH
RUN apk update && apk upgrade && \
  echo http://nl.alpinelinux.org/alpine/v$APK_BRANCH/community > /etc/apk/repositories && \
  echo http://nl.alpinelinux.org/alpine/v$APK_BRANCH/main >> /etc/apk/repositories && \
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
RUN chown -R node /app

USER node

RUN printf '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\nalways-auth=true\n' > .npmrc

# Enables layer caching
COPY --chown=node:node package.json yarn.lock ./
# I know it's not optimal, will be optimized later
COPY --chown=node:node packages/picasso/package.json ./packages/picasso/package.json
COPY --chown=node:node packages/picasso-lab/package.json ./packages/picasso-lab/package.json
COPY --chown=node:node packages/picasso-charts/package.json ./packages/picasso-charts/package.json
COPY --chown=node:node packages/picasso-forms/package.json ./packages/picasso-forms/package.json
COPY --chown=node:node packages/shared/package.json ./packages/shared/package.json
COPY --chown=node:node packages/picasso-codemod/package.json ./packages/picasso-codemod/package.json
COPY --chown=node:node packages/topkit-analytics-charts/package.json ./packages/topkit-analytics-charts/package.json

RUN yarn install --frozen-lockfile

COPY --chown=node:node . /app
