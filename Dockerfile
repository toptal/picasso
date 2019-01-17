FROM node:10-alpine

ARG NPM_TOKEN
ENV NPM_TOKEN ${NPM_TOKEN}

ENV PATH="${PATH}:/node_modules/.bin"

# Installs Chromium (71) package.
ENV CHROME_BIN /usr/bin/chromium-browser
RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      harfbuzz@edge \
      nss@edge

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
# Puppeteer v1.9.0 works with Chromium 71.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true



# Run everything after as non-privileged user.
COPY . /app
WORKDIR /app

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser
RUN adduser -S -g pptruser pptruser
RUN mkdir -p /home/pptruser/Downloads
RUN chown -R pptruser:pptruser /home/pptruser
RUN chown -R pptruser:pptruser /app

USER pptruser

RUN yarn install
