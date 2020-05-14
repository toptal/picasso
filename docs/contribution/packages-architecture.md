# Picasso packages architecture

## Imports

We do have pretty complex imports connections configured inside Picasso packages. We use Lerna to link and mange modules inside Picasso.

- */packages/{package}/tsconfig.build.json*

  File is needed when we build each package for publishing/releasing. `Paths` there are used to reference other Picasso packages correctly.

- */tsconfig.json*

  File used on development time to link correctly packages for IDE. And `paths` are used by Picasso Storybook to resolve cross packages imports from code examples (but it works only in combination with change in the `/.storybook/webpack.config.js` `alias`). Also, used as a base tsconfig.json for the rest of the packages.

- */.storybook/tsconfig.json*

  File used when building Storybook of Picasso to include correctly files, which are needed for Storybook only.

- */.storybook/webpack.config.js*

  `alias` there are needed for resolving correctly paths inside code examples during the build-time of Storybook.
