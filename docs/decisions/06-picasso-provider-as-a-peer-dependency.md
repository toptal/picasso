# `picasso-provider` as a peer dependency

## Problem

Currently, `picasso-provider` is a "hard" dependency of `picasso`, meaning that
each `picasso` module can have a different version of the `provider`. In setups
where different packages of a monorepo have different versions of picasso this
can be problematic as each one receives a different instance in runtime of the
same package.

## Proposal

`picasso-provider` should be defined as `peerDependency` of both `picasso` and
`picasso-shared` and to be provided from the projects that use it. This way only
a single version and runtime instance will be provided for all the projects.

### Drawbacks and limitations

- The project that imports `picasso` must add a `picasso-provider` to its
  dependencies

## Alternatives

- We can keep using resolutions for asserting only one package version in the
  whole project. Has the same result as proposed solution with a few cons.
  * **Pros**:
    - Already being used
  * **Cons**:
    + `yarn` doesn't warn when the resolution is being overridden to a version
      that is incompatible with other dependencies. Meaning it will not trigger
      a warning in case some of the picassos need a newer version than the being
      resolved
    + `resolutions` don't respect nesting, while peerDependencies can be nested,
      meaning sub-projects can have different versions of the provider,
      `resolutions` will override all depencies that need the provider to the
      same
    + `yarn` specific, other package managers don't support resolutions or have
      different mechanisms for it
- Each subproject has its own `<Picasso />` provider, instead of just one in
  the root of the project
  * **Pros**:
    + No need to have a separate project to `picasso-provider`
    + Different projects can have totally different versions of `picasso`
  * **Cons**:
    + There's no generic or easy way of setting a single `picasso-provider` to
      an app in Toptal monorepos
    + Repeating code
    + Might give raise to incosistencies between different apps
