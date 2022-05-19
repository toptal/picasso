# Single Visual Tests tool

## Problem

Two different frameworks for visual testing are currently supported in Picasso:
1. Puppeteer with Storybook
2. Happo with Cypress

The Puppeteer based stack has some downsides:
- screenshots are hard to update
- diffs inspection is not straightforward on local machines
- execution is slow
- together with Happo, we have 2 remote places where we inspect screenshot changes: Github (created via `jest-image-snapshot`, committed in PRs) and Happo

## Goal

The Puppeteer stack is removed in favor of using the Happo provider.

## Options

This section was added to clarify the options for Picasso with the Happo provider.
The options are:
- pure Storybook plugin, all visual tests being done in Storybook
- mix between Storybook and Cypress plugins, visual test being split, most likely with two separate CI jobs
- pure Cypress plugin, all visual tests being done in Cypress

## Proposal

Replace the Puppeteer stack with the Happo provider plugin for Storybook, while **keeping** Cypress tests.
This was a team-level decision in FX via polling: https://toptal-core.slack.com/archives/GG3F4AS4T/p1652967032843459

#### Advantages:
- the Puppeteer based stack would be removed fast, while maintaining visual tests coverage via Storybook
- there will be no overhead in trying to migrate visual tests over to Cypress

#### Disadvantages:
- supporting and maintaining two Happo configurations for visual tests (for Storybook and Cypress plugins)

#### Points that remain the same when comparing to current approach
- maintenance and development for Cypress visual tests is still needed, as they are covering different areas
- daily developer decisions on what will be tested in Storybook vs. what will be tested in Cypress is needed, making test development harder
- some examples will be ignored from visual testing in Storybook due to duplication in Cypress

## Alternatives

1. Replace the Puppeteer stack with the Happo provider plugin for Storybook, while **removing** Cypress tests.
- The benefits are:
  - easy way out with the least effort

- The downsides are:
  - less control, reporting and visibility over what's covered (there are currently skipped visual tests for some examples in Storybook)
  - introduction of test runner for Storybook in order to compensate the loss of Cypress visual tests: https://storybook.js.org/docs/react/writing-tests/test-runner
  - some work would be needed to migrate Cypress visual tests to Storybook

2. Move all visual tests to Cypress with Happo.
- The benefits are:
  - Picasso will support only one provider (Happo) and framework (Cypress) for visual tests
  - PRs will have only one visual tests check
  - only one plugin and configuration will need maintenance
  - visual tests on the end result of integration testing between multiple components (ex: collapsed sidebar with opened sub-menu)
  - accurate knowledge and reporting on what is being tested as part of the visual testing stack

- The downsides are:
  - it will take some time to migrate tests to Cypress
  - manual intervention in adding visual tests later
  - the Puppeteer stack (and tests) can't be removed immediately

## Research data

There's no particular research data for this RFC, other than what we already have:
- https://docs.happo.io/docs/storybook
- https://github.com/toptal/picasso/blob/master/docs/contribution/visual-testing.md
- https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/2157478039/Frontend+Testing+-+Visual+Testing
- https://storybook.js.org/docs/react/writing-tests/test-runner
