# MUI v5 migration

## Problem

After MUI introduced v5, they will not provide bug fixes for v4.
MUI v5 has better CSS-in-JS performance.

## Proposal

Migrate Picasso to use MUI v5 with minimal breaking changes

## Plan

Since migration requires many changes, we want to do it gradually.

- create feature branch
- combine both MUI v4 and v5 styles and theme providers inside our `Picasso` root component
- migrate all components
- cleanup `Picasso` root from v4 providers
- remove MUIv4 packages
- migrate Picasso to use `tss-react` or `styled`

A PoC created to test the idea: https://github.com/toptal/picasso/pull/2730

## Alternatives

### `emotion` vs `styled-components`

_Pros:_

- `emotion` is very similar to our current `makeStyles` CSS solution, so fewer changes

_Cons:_

- none

**We propose to use `emotion`**

### feature branch vs using master directly

_Pros:_

- we can merge our PR's to master without releasing
- it will eliminate conflicts

_Cons:_

- it may block all other future hotfix releases

**We propose to use feature branch**

### feature branch vs creating v5 folder for each component

We can create e.g. `button-v5` folder with all files copied from `button` and do the changes on it

_Pros:_

- they can stay private for our clients including `PicassoV5`

_Cons:_

- it will be hard to maintain both components in the storybook even for local development
- folders count will be doubled

**We propose to use feature branch**

### two separated Picasso roots vs combine v4 and v5 in one Picasso root

_Pros:_

- one combined root will solve the problem about migrating complex components which renders multiple components inside

_Cons:_

- none 

**We propose to use one combined Picasso root**