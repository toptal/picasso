# Visual Snapshots

To maintain stability between versions we’ve introduced snapshotting tool with the help of puppeteer to browse storybook of all components, creating screenshot of the page and comparing the diff with [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot) 

All necessary logic resides inside [/puppeteer](https://github.com/toptal/picasso/tree/master/puppeteer) directory.  It walks through all components and check all `story/index.jsx` files, read it as AST transformation tree and tries to generate all necessary examples which need to be saved as screenshots. 

Storing/Updating snapshots has the same logic as `jest` snapshots. Therefore in the repository we store the `correct` state of the components. If during implementation there is any visual change, image diff will reports this error to a report and Developer needs to manually check if the current state is expected, then developer marks current state as expected one.

## Fixing Visual Test error inside a PR
When you introduce visual change which breaks the current state of snapshots, Jenkins job `Visual Tests` will report you with such violation. At this point, you are obligated to run storybook locally and manually check differences. e.g. when you changed padding on some component, and you are sure that this is intended behavior, you can rewrite them by running `yarn test:visual -u` which will generate new state. All changes need to be committed to the PR and Jenkins will re-check repository with the new state.

All screenshots are stored in a folder `__image_snapshots__` inside every root folder of components.

![jest-flow](https://user-images.githubusercontent.com/324488/57615955-57729680-757d-11e9-9b1a-ca299deebd99.png)
