---
'@toptal/picasso-provider': patch
---

- cut the `@toptal/picasso-provider` → `@toptal/picasso-notification` source-import cycle that PF-2031 publish forensics flagged. The `NotificationsProvider` integration test (which exercised `maxNotifications` by going through `useNotifications`) moved to `cypress/component/NotificationsProvider.spec.tsx`, and the `PicassoLight with notifications and favicon` storybook example was dropped (the equivalent demonstration already lives in `@toptal/picasso-notification`'s `use-notification/story/MaxNotifications.example.tsx`). No public API change.
