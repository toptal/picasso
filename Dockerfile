FROM node:14-alpine

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ARG GIT_SHA
ENV GIT_SHA ${GIT_SHA}

ARG APK_BRANCH=3.10
ENV APK_BRANCH ${APK_BRANCH}

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
  su-exec \
  openssh-client \
  bash \
  sed \
  shadow

# Change default 'node' user id to match jenkins CI user id
# so when we will be running container from CI it would have
# all necessary rights for npm/yarn publish
RUN groupmod -g 469 node && usermod -u 469 -g 469 node

WORKDIR /app

# Enables layer caching
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . /app

RUN yarn config set workspaces-experimental true
RUN yarn install --frozen-lockfile && yarn cache clean

# needs to be +rw for rm and mkdir /build
RUN chmod a+rw /app && \
  chmod a+rw /app/packages/picasso && \
  chmod a+rw /app/packages/picasso-lab && \
  chmod a+rw /app/packages/picasso-forms && \
  chmod a+rw /app/packages/picasso-charts && \
  chmod a+rw /app/packages/topkit-analytics-charts && \
  chmod a+rw /app/packages/shared && \
  chmod a+rw /app/packages/picasso/CHANGELOG.md && \
  chmod a+rw /app/packages/picasso-lab/CHANGELOG.md && \
  chmod a+rw /app/packages/picasso-forms/CHANGELOG.md && \
  chmod a+rw /app/packages/picasso-charts/CHANGELOG.md && \
  chmod a+rw /app/packages/topkit-analytics-charts/CHANGELOG.md && \
  chmod a+rw /app/packages/shared/CHANGELOG.md && \
  chmod a+rw /app/package.json && \
  chmod a+rw /app/yarn.lock

COPY bin/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
