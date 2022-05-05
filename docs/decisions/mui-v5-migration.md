# MUI v5 migration

## Problem

After MUI introduced v5, they will not provide bug fixes for v4.
MUI v5 has better CSS-in-JS performance.

## Proposal

Migrate Picasso to use MUI v5 with minimal breaking changes

## Plan

Since migration requires many changes, we want to do it gradually.

- create feature branch
- create new version of `Picasso` root component (e.g: `PicassoV5`) for new styled engine, theming and style overrides
- configure storybook to use `PicassoV5` with migrated components while running storybook visual tests
- migrate all components
- replace old Picasso root with `PicassoV5`
- remove MUIv4 packages
- migrate Picasso to use tss-react

A PoC with `PicassoV5` and a sample component migration should be prepared before continuing.

## Alternatives

### `emotion` vs `styled-components`

- `emotion` is very similar to our current `makeStyles` CSS solution, so fewer changes

### feature branch vs using master directly

we can merge our PR's to master without releasing, but it may block all other future hotfix releases

### feature branch vs creating v5 folder for each component

we can create e.g. `button-v5` folder with all files copied from `button` and do the changes on it

_Pros:_

- they can stay private for our clients including `PicassoV5`

_Cons:_

- it will be hard to maintain both components in the storybook even for local development
- folders count will be doubled
