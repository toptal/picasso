# Visual Testing

To maintain stability between versions, we integrated [Happo](https://happo.io) with [Cypress Component Testing](https://docs.happo.io/docs/cypress) and [Storybook](https://docs.happo.io/docs/storybook).

The `correct` state of the components is taken from the latest revision on the `master` branch.
All differences in open PRs can be reviewed in Happo reports.
The links for Happo reports can be found in the PR checks section.

## Fixing broken visual tests inside a PR

In order to have a good tracking on visual changes which were applied in each PR, we run visual snapshot comparison inside each pull request. `Happo` is automatically trying to take snapshot of each story and compare the result to a previous state. When your PR has failing visual tests you need to update them.

Follow these steps for fixing a visual differences in Happo reports:
1. Inspect the PR checks section and click the `Details` link for the failed Happo job, opening the report.
2. Inspect the differences.
3. Approve the report if they are aceptable.
4. Success! The PR job is now green.
