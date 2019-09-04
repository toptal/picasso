FROM node:11-alpine

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ARG GIT_SHA
ENV GIT_SHA ${GIT_SHA}

ARG APK_BRANCH=3.9
ENV APK_BRANCH ${APK_BRANCH}

ENV PATH="${PATH}:/app/node_modules/.bin"

# Installs Chromium (72) package.
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
      sed

WORKDIR /app

# Enables layer caching
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . /app

# needs to be +rw for rm and mkdir /build
RUN chmod a+rw /app
# needs to be +rw for changing the content and use NPM_TOKEN for publish
RUN chmod a+rw /app/.npmrc

COPY bin/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
