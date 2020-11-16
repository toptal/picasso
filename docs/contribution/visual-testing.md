# Visual Testing

To maintain stability between versions we’ve introduced snapshotting tool with the help of puppeteer to browse storybook of all components, creating screenshot of the page and comparing the diff with [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)

All necessary logic resides inside [/puppeteer](https://github.com/toptal/picasso/tree/master/puppeteer) directory. It walks through all components and check all `story/index.jsx` files, read it as AST transformation tree and tries to generate all necessary examples which need to be saved as screenshots.

Storing/Updating snapshots has the same logic as `jest` snapshots. Therefore in the repository we store the `correct` state of the components. If during implementation there is any visual change, image diff will reports this error to a report and Developer needs to manually check if the current state is expected, then developer marks current state as expected one.

## Fixing broken visual tests inside a PR

In order to have a good tracking on visual changes which were applied in each PR, we run visual snapshot comparison inside each pull request. `Jenkins` is automatically trying to take snapshot of each component and compare the result to a previous state. Logic behind this is similar as running `jest` snapshots, therefore when your PR has failing visual tests you need to update them.

1. Check the report on jenkins which are linked to the PR status.
2. Manually check the differences by eye and ensure that the current state of the screenshot is the expected state.
3. After the engineer is sure that the current changes are legitimate run `yarn test:visual -u` on your local machine.
4. Command should re-generate snapshots which are different against previous version.
5. Commit generated `.png` files to the PR.
6. Visual tests job should be green now.

`yarn test:visual -u` - Updating to current snapshots

If you want to update only some snapshots with the specific names, run:

```bash
yarn test:visual -u -t *snapshot_name_pattern*

// example
// will update Typography:Colors, Colors:Colors snapshots
yarn test:visual -u -t Colors

```

Also, right now visual tests are using docker images from `gcr.io/toptal-hub`, so to use them you need to have `docker` authenticated with `gcloud`. How to make it you can read [here](https://toptal-core.atlassian.net/wiki/spaces/IE/pages/337838085/Docker#Docker-docker-loginLogintoToptal'sprivateregistry). As well, if you want to build your own local image you can use `--build-image` argument:

```bash
yarn test:visual --build-image -u -t Colors
```

![jest-flow](https://user-images.githubusercontent.com/324488/57615955-57729680-757d-11e9-9b1a-ca299deebd99.png)

## How visual testing works on CI

We run visual tests as a part of the CI job [picasso-pr-specs](https://jenkins.toptal.net/job/picasso-pr-specs) after other checks already passed (like linter, unit tests and test build is generated).

To run visual tests we need a special build of Picasso storybook with each component example at the separate page (story). To make this build we run `TEST_ENV=visual yarn build:storybook` right before starting jest visual testing. The flag `TEST_ENV=visual` is responsible for building that _special_ visual testing build.

Jest/Puppeteer tests take each page (story) with a single component on it and make a screenshot, which is stored in `./__diff_output__/latest/*` folder as `png` file. Later CI job takes the folder `./__diff_output__/latest/` and archive it as a Jenkins artifact. Jenkins stores this folder together with the generated report file `index.html` (based on `puppeteer/reporter.js` rules) and attach the link to the job result in the PR.
