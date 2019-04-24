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
      chromium

RUN /usr/bin/chromium-browser --version

# Run everything after as non-privileged user.
COPY . /app
WORKDIR /app

RUN ls -la /app

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser
RUN adduser -S -g pptruser pptruser
RUN mkdir -p /home/pptruser/Downloads
RUN chown -R pptruser:pptruser /home/pptruser
RUN chown -R pptruser:pptruser /app

USER pptruser
