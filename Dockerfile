# syntax=docker/dockerfile:1
FROM node:18-alpine

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
COPY --chown=node:node packages/picasso-charts/package.json ./packages/picasso-charts/package.json
COPY --chown=node:node packages/picasso-forms/package.json ./packages/picasso-forms/package.json
COPY --chown=node:node packages/shared/package.json ./packages/shared/package.json
COPY --chown=node:node packages/picasso-codemod/package.json ./packages/picasso-codemod/package.json
COPY --chown=node:node packages/topkit-analytics-charts/package.json ./packages/topkit-analytics-charts/package.json
COPY --chown=node:node packages/picasso-provider/package.json ./packages/picasso-provider/package.json
COPY --chown=node:node packages/picasso-pictograms/package.json ./packages/picasso-pictograms/package.json
COPY --chown=node:node packages/picasso-rich-text-editor/package.json ./packages/picasso-rich-text-editor/package.json
COPY --chown=node:node packages/picasso-query-builder/package.json ./packages/picasso-query-builder/package.json
COPY --chown=node:node packages/picasso-tailwind/package.json ./packages/picasso-tailwind/package.json
COPY --chown=node:node packages/picasso-tailwind-merge/package.json ./packages/picasso-tailwind-merge/package.json
COPY --chown=node:node packages/base/Accordion/package.json ./packages/base/Accordion/package.json
COPY --chown=node:node packages/base/AccountSelect/package.json ./packages/base/AccountSelect/package.json
COPY --chown=node:node packages/base/Alert/package.json ./packages/base/Alert/package.json
COPY --chown=node:node packages/base/Amount/package.json ./packages/base/Amount/package.json
COPY --chown=node:node packages/base/Fade/package.json ./packages/base/Fade/package.json
COPY --chown=node:node packages/base/Collapse/package.json ./packages/base/Collapse/package.json
COPY --chown=node:node packages/base/Backdrop/package.json ./packages/base/Backdrop/package.json
COPY --chown=node:node packages/base/ApplicationUpdateNotification/package.json ./packages/base/ApplicationUpdateNotification/package.json
COPY --chown=node:node packages/base/Autocomplete/package.json ./packages/base/Autocomplete/package.json
COPY --chown=node:node packages/base/Avatar/package.json ./packages/base/Avatar/package.json
COPY --chown=node:node packages/base/AvatarUpload/package.json ./packages/base/AvatarUpload/package.json
COPY --chown=node:node packages/base/Badge/package.json ./packages/base/Badge/package.json
COPY --chown=node:node packages/base/Breadcrumbs/package.json ./packages/base/Breadcrumbs/package.json
COPY --chown=node:node packages/base/Button/package.json ./packages/base/Button/package.json
COPY --chown=node:node packages/base/Calendar/package.json ./packages/base/Calendar/package.json
COPY --chown=node:node packages/base/Carousel/package.json ./packages/base/Carousel/package.json
COPY --chown=node:node packages/base/Checkbox/package.json ./packages/base/Checkbox/package.json
COPY --chown=node:node packages/base/Container/package.json ./packages/base/Container/package.json
COPY --chown=node:node packages/base/DatePicker/package.json ./packages/base/DatePicker/package.json
COPY --chown=node:node packages/base/DateSelect/package.json ./packages/base/DateSelect/package.json
COPY --chown=node:node packages/base/Drawer/package.json ./packages/base/Drawer/package.json
COPY --chown=node:node packages/base/Dropdown/package.json ./packages/base/Dropdown/package.json
COPY --chown=node:node packages/base/Dropzone/package.json ./packages/base/Dropzone/package.json
COPY --chown=node:node packages/base/EmptyState/package.json ./packages/base/EmptyState/package.json
COPY --chown=node:node packages/base/EnvironmentBanner/package.json ./packages/base/EnvironmentBanner/package.json
COPY --chown=node:node packages/base/FileInput/package.json ./packages/base/FileInput/package.json
COPY --chown=node:node packages/base/Form/package.json ./packages/base/Form/package.json
COPY --chown=node:node packages/base/Grid/package.json ./packages/base/Grid/package.json
COPY --chown=node:node packages/base/Helpbox/package.json ./packages/base/Helpbox/package.json
COPY --chown=node:node packages/base/Icons/package.json ./packages/base/Icons/package.json
COPY --chown=node:node packages/base/Image/package.json ./packages/base/Image/package.json
COPY --chown=node:node packages/base/InputAdornment/package.json ./packages/base/InputAdornment/package.json
COPY --chown=node:node packages/base/Input/package.json ./packages/base/Input/package.json
COPY --chown=node:node packages/base/Link/package.json ./packages/base/Link/package.json
COPY --chown=node:node packages/base/List/package.json ./packages/base/List/package.json
COPY --chown=node:node packages/base/Loader/package.json ./packages/base/Loader/package.json
COPY --chown=node:node packages/base/Logo/package.json ./packages/base/Logo/package.json
COPY --chown=node:node packages/base/Menu/package.json ./packages/base/Menu/package.json
COPY --chown=node:node packages/base/ModalContext/package.json ./packages/base/ModalContext/package.json
COPY --chown=node:node packages/base/Note/package.json ./packages/base/Note/package.json
COPY --chown=node:node packages/base/Modal/package.json ./packages/base/Modal/package.json
COPY --chown=node:node packages/base/Notification/package.json ./packages/base/Notification/package.json
COPY --chown=node:node packages/base/NumberInput/package.json ./packages/base/NumberInput/package.json
COPY --chown=node:node packages/base/OutlinedInput/package.json ./packages/base/OutlinedInput/package.json
COPY --chown=node:node packages/base/OverviewBlock/package.json ./packages/base/OverviewBlock/package.json
COPY --chown=node:node packages/base/Page/package.json ./packages/base/Page/package.json
COPY --chown=node:node packages/base/Pagination/package.json ./packages/base/Pagination/package.json
COPY --chown=node:node packages/base/Paper/package.json ./packages/base/Paper/package.json
COPY --chown=node:node packages/base/PasswordInput/package.json ./packages/base/PasswordInput/package.json
COPY --chown=node:node packages/base/Popper/package.json ./packages/base/Popper/package.json
COPY --chown=node:node packages/base/PromptModal/package.json ./packages/base/PromptModal/package.json
COPY --chown=node:node packages/base/Quote/package.json ./packages/base/Quote/package.json
COPY --chown=node:node packages/base/Radio/package.json ./packages/base/Radio/package.json
COPY --chown=node:node packages/base/Rating/package.json ./packages/base/Rating/package.json
COPY --chown=node:node packages/base/Section/package.json ./packages/base/Section/package.json
COPY --chown=node:node packages/base/Select/package.json ./packages/base/Select/package.json
COPY --chown=node:node packages/base/ShowMore/package.json ./packages/base/ShowMore/package.json
COPY --chown=node:node packages/base/SkeletonLoader/package.json ./packages/base/SkeletonLoader/package.json
COPY --chown=node:node packages/base/Slider/package.json ./packages/base/Slider/package.json
COPY --chown=node:node packages/base/Step/package.json ./packages/base/Step/package.json
COPY --chown=node:node packages/base/Switch/package.json ./packages/base/Switch/package.json
COPY --chown=node:node packages/base/Table/package.json ./packages/base/Table/package.json
COPY --chown=node:node packages/base/Tabs/package.json ./packages/base/Tabs/package.json
COPY --chown=node:node packages/base/Tag/package.json ./packages/base/Tag/package.json
COPY --chown=node:node packages/base/Tagselector/package.json ./packages/base/Tagselector/package.json
COPY --chown=node:node packages/base/Test-Utils/package.json ./packages/base/Test-Utils/package.json
COPY --chown=node:node packages/base/Timeline/package.json ./packages/base/Timeline/package.json
COPY --chown=node:node packages/base/Timepicker/package.json ./packages/base/Timepicker/package.json
COPY --chown=node:node packages/base/Tooltip/package.json ./packages/base/Tooltip/package.json
COPY --chown=node:node packages/base/TreeView/package.json ./packages/base/TreeView/package.json
COPY --chown=node:node packages/base/TypographyOverflow/package.json ./packages/base/TypographyOverflow/package.json
COPY --chown=node:node packages/base/Typography/package.json ./packages/base/Typography/package.json
COPY --chown=node:node packages/base/UserBadge/package.json ./packages/base/UserBadge/package.json
COPY --chown=node:node packages/base/Utils/package.json ./packages/base/Utils/package.json

# Install node_modules
RUN yarn install --frozen-lockfile

# COPY sources to workdir
COPY --chown=node:node . /app

# Need this file for publishing packages to npm
RUN printf '//registry.npmjs.org/:_authToken=${NPM_TOKEN}\nalways-auth=true\n' > .npmrc
