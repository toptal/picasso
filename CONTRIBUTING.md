# Contributing to Picasso

👍🎉 First off, thanks for taking the time to contribute! 👍🎉

The following is a set of guidelines for contributing to Picasso and its packages, which are hosted in the Toptal Organization on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request or on a slack channel. Picasso should serve to everyone, therefore if you dislike anything feel free to reach us out and propose changes 💗.

## Table Of Contents

[What should I know before I get started?](#what-should-i-know-before-i-get-started)

- [About Picasso](#about-picasso)
- [Design decisions](#design-decisions)

[How Can I Contribute?](#how-can-i-contribute)

- [Reporting Bugs](#reporting-bugs)
- [Creating new components](#creating-new-components)
- [Your first contribution](#your-first-contribution)
- [Release](#release)

[Why my first PR is taking too long to merge ?](#why-my-first-pr-is-taking-too-long-to-merge-)

## Technical guides

- [GitHub workflow](docs/contribution/github-workflow.md)
- [CSS naming](docs/contribution/css-naming.md)
- [JSS onboarding](docs/contribution/jss-onboarding.md)
- [New components](docs/contribution/new-component-creation.md)
- [Creating examples](docs/contribution/creating-examples.md)
- [Visual snapshots](docs/contribution/visual-testing.md)
- [How to design component API](docs/contribution/component-api.md)
- [Bug Fixes in LTS](docs/bug-fixes-in-lts.md)

## Tutorials

- [How to layout forms](https://picasso.toptal.net/?path=/story/tutorials-folder--how-to-layout-forms)
- [How to layout a page](https://picasso.toptal.net/?path=/story/tutorials-folder--how-to-layout-a-page)
- [How to use spacings](https://picasso.toptal.net/?path=/story/tutorials-folder--how-to-use-spacings)

## What should I know before I get started?

### About Picasso

Picasso is an internal company open source project &mdash; yes we just invented this approach 😄, which should help everyone inside Toptal to focus on their work and forgot about issues with design sync-up, repeating same implementations of UI/UX patterns, and follow same conventions in all FE projects.

Picasso is considered as project of everyone but on the top of that `Frontend Experience` team has ownership of all code and we are maintaining and keeping consistency and quality on highest level.

### Design decisions

We try to have everything inside `Picasso` synced with latest design proposal called `BASE` &mdash; if you see this name it's always referring to our `BASE` design which you could probably already see inside `TopScheduler` or `Portal` projects. Any design decision made should be discussed with us and could be also discussed on `#-base-core` channel through slack.

## How can I contribute?

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Open a PR with your first contribution
3. Make sure test pass by running `yarn test` and `yarn test:visual`

   - [Fixing broken visual tests](./docs/contribution/visual-testing.md#fixing-broken-visual-tests-inside-a-pr)
   - [Project commands](./README.md#project-commands)

4. Ask for a review in [#-frontend-exp-core](https://toptal-core.slack.com/archives/CERF5NHT3)

### Your first contribution

In following section we would like to describe some key pain points of creating your first PR to the `Picasso` repository.

We understand many cases when you are pushed by deadlines and you need to provide some feature and at the same time you would like to contribute to `Picasso`, but we all need to understand purpose of `Picasso`. As we are building core library for **ALL** things created at Toptal we need to put a strong emphasis on code quality and readability. Not only strong, but maximum possible level of quality, you need to treat `Picasso` as tool for everyone therefore even some code looks clear to you, it might not be very clear to others. In your first PR probably you will receive many comments regarding code conventions, codestyle and refactoring your code, which may look to you unnecessary but only with that we can keep level of quality and easiness of next contributions at best level.

### Reporting Bugs

This section guides you through submitting a bug report for Picasso. Following these guidelines helps maintainers and other engineers understand your report 📝, reproduce the behavior 💻 💻, and find related reports 🔎.

In case that you found something which doesn't work as advertised feel free to reach out us on [#-frontend-exp-core](https://toptal-core.slack.com/archives/CERF5NHT3) channel with a question, we will either guide you how to solve that issue ask you to create a bug inside GitHub repository and in most cases we will propose you a workaround to immediately unblock you if it's possible.

### Creating new components

Picasso should cover all repetitive and reusable components used at Toptal. As we can't fully track every line created by you, you are welcomed to propose any new component which should be part of Picasso and you see that it might be a helpful addition used also by the other people. Don't be afraid to raise any question and propose new ideas to us.

### Release

We use [changesets](https://github.com/atlassian/changesets) to manage releases for Picasso packages.

As a contributor, we expect you to create a "changeset" file for the changes you've made. You can do it, by running:

```
yarn changeset
```

"changeset" file should be committed together with the modified code to the PR branch. You can also check [how to add changeset](https://github.com/atlassian/changesets/blob/main/docs/adding-a-changeset.md) for more details.

When the PR is merged, additional "Version Packages [skip ci]" PR is created with the version bump and changelogs generated. FX team member should merge this PR to make a release.

#### Why my first PR is taking too long to merge?

We use strict code conventions and building UI framework, so you need to take into consideration that when the contribution works for your particular case, it might not work for 10 others. Different environments which can reuse components from `Picasso` could lead us to a different behaviours which we need to minimize as much as possible.

We try to do our best while reviewing PR's but as we and other people are already heavily contributing to `Picasso` some things could look obvious to us but not to you. We appreciate your patience inside first PR and if you feel that you didn't get enough information from our contribution guide, raise this issue and we will update documentation with necessary information.

#### How I can preview changes or send a link to anyone with my changes?

We got you covered! Every commit in PR is automatically built with Storybook and published online so you can easily share any work in progress to your colleague or designers if you need. This job is finished even if you have errors inside specs or if anything else is failing. ✌️
