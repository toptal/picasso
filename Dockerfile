# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.20.0
ARG PNPM_VERSION=10.32.1

FROM node:${NODE_VERSION}-alpine

ARG PNPM_VERSION

ENV PATH="${PATH}:/app/node_modules/.bin" \
  # Installs Chromium (77) package.
  CHROME_BIN=/usr/bin/chromium-browser \
  # We don't pass real value here, workaround to bypass npm check on from .npmrc
  NPM_TOKEN=''

RUN apk add --no-cache \
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
# all necessary rights for npm/pnpm publish
RUN groupmod -g 469 node && usermod -u 469 -g 469 node
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# Fix permissions to a workdir
RUN chown -R node /app

USER node

# Enables layer caching: copy lockfile + workspace manifests first,
# install, then copy the rest of the source.
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc lerna.json ./
COPY --chown=node:node packages packages

# Prune to manifests so dependency installation stays cache-friendly.
RUN find packages -mindepth 2 -maxdepth 2 \! -name "package.json" -print | xargs rm -rf
RUN find packages/base -mindepth 2 -maxdepth 2 \! -name "package.json" -print | xargs rm -rf

RUN pnpm install --frozen-lockfile

# COPY sources to workdir
COPY --chown=node:node . /app

# Need this file for publishing packages to npm
RUN printf '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\nalways-auth=true\n' > .npmrc
