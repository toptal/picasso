# @toptal/picasso-query-builder

[![Picasso NPM package](https://img.shields.io/npm/v/@toptal/picasso-charts?color=green&logo=toptal)](https://www.npmjs.com/package/@toptal/picasso-query-builder)

This package combines easy-to-use API of [React Query Builder](react-querybuilder.js.org) with the amazing UX of Picasso.

Query Builder implementation provides possibility to use variety of searching rules
in order to improve searching experience by complex Dynamic Queries generation.

This library allows to:

- build complex queries based on provided data
- add custom components or operators
- create nested queries
- enhance user experience

This library works by providing a user interface for constructing queries
on the client-side. The generated queries can be serialized into a format suitable
for sending it to the backend.

## Prerequisites

The following peer dependencies are required:

- `@toptal/picasso`

### React compatibility

This package requires `react >= 18`, unlike the rest of the Picasso packages,
which also support React 17. The floor comes from `react-querybuilder` v7.1+
(the library this package wraps), whose internals depend on `react-redux` v9
and therefore React 18. Consumers still on React 17 must stay on the previous
major of this package.

## Setup

- `yarn add @toptal/picasso-query-builder`

## Documentation

Documentation and demos are available at [picasso.toptal.net](https://picasso.toptal.net/).

---
