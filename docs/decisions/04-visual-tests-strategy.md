# Visual tests strategy

## Problem

Two different frameworks for visual testing are currently supported in Picasso:
1. Puppeteer with Storybook
2. Happo with Cypress

## Proposal

Move all visual tests to Cypress with Happo.

The reasons for this are:
- Picass will support only one provider (Happo) and framework (Cypress) for visual tests
- PRs will have only one visual tests check
- Storybook's purpose in Picasso is not for doing visual tests
- supporting two different plugins (Storybook and Happo) brings additional complexity and maintenance effort

Considering this move, we will gain:
- control which visual tests we add
- better control over component state
- a more transparent way on seeing what is tested and what is not covered with visual tests

### Drawbacks and limitations

There are two drawbacks present to the above proposal:
- it will take some time to migrate tests to Cypress
- manual intervention in adding visual tests later
- the Puppeteer stack (and tests) can't be removed immediately

## Alternatives

1. Simply replace the Puppeteer stack with the Happo provider for visual tests in Storybook:
- this is the easy way out, but gives us less control and visibility over what's covered
- maintenance over Cypress visual tests is still needed, as they are covering different areas
- it requires supporting and maintaining two configurations for visual tests

2. A mix between Storybook and Cypress visual tests, both using the Happo provider plugins:
- the Puppeteer based stack would be removed fast, while maintaining visual tests coverage via Storybook
- evaluation for which components will be tested in Storybook vs. what will be tested in Cypress is needed
- additional work is needed to disable some visual tests in Storybook and add them in Cypress

## Research data

There's no particular research data for this RFC, other than what we already have:
- https://docs.happo.io/docs/storybook
- https://github.com/toptal/picasso/blob/master/docs/contribution/visual-testing.md
- https://toptal-core.atlassian.net/wiki/spaces/ENG/pages/2157478039/Frontend+Testing+-+Visual+Testing
