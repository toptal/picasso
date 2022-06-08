# `picasso-provider` as a peer dependency

## Problem

Currently, `picasso-provider` is a "hard" dependency of `picasso`, meaning that
each `picasso` module can have a different version of the `provider`. In setups
were different packages of a monorepo have different versions of picasso this
can be problematic as each one receive a different instance in runtime of the
same package.

## Proposal

`picasso-provider` should be defined as `peerDependency` of both `picasso` and
`picasso-shared` and to be provided from the projects that use it. This way only
a single version and runtime instance will be provided for all the projects.

### Drawbacks and limitations

- The project that imports `picasso` must provide a `picasso-provider` as its
  dependencies

## Alternatives

- We can keep using resolutions for asserting only one package version in the
  whole project
- Each subproject has its own `<Picasso />` provider, instead of just one in
  the root of the project

