<div style="max-width: 800px;">

## How to make fix to the LTS version of Picasso

Current LTS version of Picasso is in `v5` branch.

- branch out of `master` and fix the bug. Create PR to `master`;
- branch out of `v5` and `cherry-pick` the commit done here :point_up:. Create PR to `v5`;
- get approvals for the both PRs and merge them in respective branches;
- right after you merge your PR to `v5` a new LTS version will be released.

_Important:_ It's not allowed to commit breaking changes into LTS branch
