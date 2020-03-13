FROM node:13-alpine

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ARG GIT_SHA
ENV GIT_SHA ${GIT_SHA}

ARG APK_BRANCH=3.10
ENV APK_BRANCH ${APK_BRANCH}

ENV PATH="${PATH}:/app/node_modules/.bin"

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
RUN yarn install --frozen-lockfile

# needs to be +rw for rm and mkdir /build
RUN chmod a+rw /app
RUN chmod a+rw /app/packages/picasso
RUN chmod a+rw /app/packages/picasso-lab
RUN chmod a+rw /app/packages/picasso-forms
RUN chmod a+rw /app/packages/picasso-charts
RUN chmod a+rw /app/packages/shared
RUN chmod a+rw /app/packages/picasso/CHANGELOG.md
RUN chmod a+rw /app/packages/picasso-lab/CHANGELOG.md
RUN chmod a+rw /app/packages/picasso-forms/CHANGELOG.md
RUN chmod a+rw /app/packages/picasso-charts/CHANGELOG.md
RUN chmod a+rw /app/packages/shared/CHANGELOG.md
RUN chmod a+rw /app/package.json

COPY bin/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
