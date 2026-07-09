---
'@toptal/picasso-provider': minor
'@toptal/picasso-modal': patch
'@toptal/picasso-drawer': patch
'@toptal/picasso-popper': patch
---

### Provider

- fix `usePicassoRoot()` returning `null` forever for components rendered during the tree's first render pass: the Picasso root node is now mirrored into React state through the new `PicassoRootNodeContext`, so `usePicassoRoot` consumers re-render and receive the real node once it mounts (`RootContext.rootRef` is kept for backward compatibility)
- `usePicassoRoot()` now returns `undefined` instead of `null` when the root is unavailable, so its result can be passed directly to any Base UI portal `container` (which treats an explicit `null` as "wait for the container" but falls back to `document.body` on `undefined`). Update any strict `=== null` checks on its result to `== null` or a falsy check

### Modal, Drawer, Popper

- fix a Modal, Drawer or Popper that is open on its very first mount never appearing: an unresolved Picasso root was passed as an explicit `null` portal container, which Base UI treats as "wait for the container" (rendering nothing forever). The portal container now degrades to `document.body` when the Picasso root is unavailable, restoring the pre-migration MUI behavior
