# Single Visual Tests tool

## Problem

Two different frameworks for visual testing are currently supported in Picasso:
1. Puppeteer with Storybook
2. Happo with Cypress

The Puppeteer based stack has some downsides:
- screenshots are hard to update
- diffs inspection is not straightforward
- execution is slow

## Goal

The Puppeteer stack is removed in favor of using the Happo provider.

## Options

This section was added to clarify the options for Picasso with the Happo provider.
The options are:
- pure Storybook plugin, all visual tests being done in Storybook
- mix between Storybook and Cypress plugins, visual test being split, most likely with two separate CI jobs
- pure Cypress plugin, all visual tests being done in Cypress

## Proposal

Move all visual tests to Cypress with Happo.

The benefits are:
- Picasso will support only one provider (Happo) and framework (Cypress) for visual tests
- PRs will have only one visual tests check
- only one plugin and configuration will need maintenance
- visual tests on the end result of integration testing between multiple components (ex: collapsed sidebar with opened sub-menu)
- accurate knowledge and reporting on what is being tested as part of the visual testing stack

Note: Storybook's main purpose in Picasso is to showcase examples to end users, not testing.

### Drawbacks and limitations

There are two drawbacks present to the above proposal:
- it will take some time to migrate tests to Cypress
- manual intervention in adding visual tests later
- the Puppeteer stack (and tests) can't be removed immediately

## Alternatives

Replace the Puppeteer stack with the Happo provider plugin for Storybook

There are some advantages if we don't drop Storybook visual tests:
- the Puppeteer based stack would be removed fast, while maintaining visual tests coverage via Storybook
- there will be no overhead in trying to migrate visual tests over to Cypress

Another important point which is neither an advantage or disadvantage is that evaluation on what exactly Cypress visual tests are covering is needed.

Furthermore, there are two options on how to proceed:
1. drop Cypress visual tests
- this is the easy way out, but gives us less control, reporting and visibility over what's covered (there are currently skipped visual tests for some examples in Storybook)
- introduction of test runner for Storybook in order to compensate the loss of Cypress visual tests: https://storybook.js.org/docs/react/writing-tests/test-runner
- some work would be needed to migrate Cypress visual tests to Storybook
2. keep Cypress visual tests
- it requires supporting and maintaining two Happo configurations for visual tests
- maintenance over Cypress visual tests is still needed, as they are covering different areas
- daily developer decisions on what will be tested in Storybook vs. what will be tested in Cypress is needed, making test development harder
- some examples will be ignored from visual testing in Storybook due to duplication in Cypress

## Research data

There's no particular research data for this RFC, other than what we already have:
- https://docs.happo.io/docs/storybook
- https://github.com/toptal/picasso/blob/master/docs/contribution/visual-testing.md
- https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/2157478039/Frontend+Testing+-+Visual+Testing
- https://storybook.js.org/docs/react/writing-tests/test-runner
