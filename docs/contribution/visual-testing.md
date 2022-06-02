# Visual Testing

To maintain stability between versions we’ve integrated snapshotting tool to browse storybook of all components, creating screenshot of the page and comparing the diff with [`happo`](https://happo.io).

It walks through all components and check all `story/index.jsx` files, read it as AST transformation tree and tries to generate all necessary examples which need to be saved as screenshots.

Storing/Updating snapshots should be handled along with `happo.io`. Happo stores the `correct` and `latest` state of the components from master/main branch. If during implementation there is any visual change, happo will reports this error to a report and Developer needs to manually check if the current state is expected, then developer approves current state as expected one.

## Fixing broken visual tests inside a PR

In order to have a good tracking on visual changes which were applied in each PR, we run visual snapshot comparison inside each pull request. `Happo` is automatically trying to take snapshot of each story and compare the result to a previous state. When your PR has failing visual tests you need to update them.

1. Check the report on `happo.io` which are linked to the PR status.
2. Manually check the differences by eye and ensure that the current state of the screenshot is the expected state.
3. After the engineer is sure that the current changes are legitimate approve them on that specific `happo.io` report.
4. Visual tests job should be green now.

## How visual testing works on CI

We run visual tests as a part of the CI job after other checks already passed (like linter, unit tests and test build is generated).

To run visual tests we need a special build of Picasso storybook with each component example at the separate page (story). To make this build we run `TEST_ENV=visual yarn build:storybook` right before starting happo visual testing. The flag `TEST_ENV=visual` is responsible for building that _special_ visual testing build.

Happo tests take each page (story) with a single component on it and make a screenshot, compares with master/main branch version, prepares a report, and inform PR with differences.