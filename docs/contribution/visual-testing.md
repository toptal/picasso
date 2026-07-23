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
3. Approve the report if they are acceptable.
4. Success! The PR job is now green.

## Verifying a component visually in a local browser

When a Happo diff needs investigating — or you just want to eyeball a change before pushing — render a single story headlessly, the same way Happo does.

Picasso ships **Storybook 6.5** (not 7+). Each story renders on its own canvas at:

```
http://localhost:9001/iframe.html?id=<story-id>&viewMode=story
```

`iframe.html` renders **only** the story canvas — no sidebar, toolbar, or addons panel — which is exactly what Happo screenshots. (`/?path=/story/...` renders the full Storybook chrome instead.) Discover the exact `<story-id>` from the browser console:

```js
// Storybook 6.5 surface:
window.__STORYBOOK_CLIENT_API__.raw().map(s => s.id)
// e.g. "components-button--button"
```

`__STORYBOOK_PREVIEW__.storyStoreValue` and `/index.json` are Storybook **7+** APIs — they return `undefined` / 404 here. If you land on Storybook's red error overlay, the id is wrong; fix the id rather than screenshotting the overlay.

### The production font is domain-locked — localhost renders Arial

Picasso's `proxima-nova` loads from a domain-locked Adobe Typekit kit that only serves on `*.toptal.net`. So the Happo baseline (rendered on `picasso.toptal.net`) uses the real font, while `localhost:9001` falls back to **Arial**.

The consequence that bites: a genuine **font-metric** regression (a dropped `line-height` pin, a wrong `letter-spacing`, glyph-driven box sizing) will **not reproduce locally** — Arial masks it — yet it is real in the Happo cloud render. So "I couldn't reproduce it locally" is never, by itself, grounds to dismiss a Happo diff as flaky or environmental. When a dimension/metric diff won't reproduce locally, stop comparing rendered boxes and **diff the source styles** instead.

## Responsive components and layout breakpoints testing

Some components on Picasso behave differently based on different device sizes
and [layout breakpoints](https://picasso.toptal.net/?path=/story/utils-breakpoints--breakpoints),
these are called on documentation Responsive Components. Identifying a
component as responsive comes down to analyzing the design specified on either
Figma or other design documentation, but they are usually identified in code by
the use of the Breakpoints API or CSS Media Queries.

It is imperative that when writing tests for Responsive Components we screenshot
the component on all breakpoint variants, so we can catch regressions and
validate the proper implementation of the design specified.

Adding visual tests for different breakpoints come on both Storybook screenshots
and Cypress tests, choosing between the two comes down to showing the parts of
the component that will change based on breakpoints. If there's a need for
user interaction before the screenshots, Cypress is the best option, otherwise
Storybook screenshots are encouraged, as it's a lot simpler.

Enabling multiple breakpoints screenshots on Storybook work by setting the
`screenshotBreakpoints` to `true` when defining examples on Storybook stories
([Example](https://github.com/toptal/picasso/blob/c40abab8a988332ba9152dfce635fa5aa31f225f/packages/picasso/src/Grid/story/index.jsx#L30))

```ts
const page = PicassoBook.section('Component').createPage(
  'FooComponent',
)
page
  .createChapter()
  .addExample('Foo/story/Default.example.tsx', {
    title: 'Default',
    screenshotBreakpoints: true,
  })
```

For enabling multiple breakpoints on Cypress tests we need to have tests for
each breakpoint, for making this job easy, we provide the `HAPPO_TARGETS` variable.
By using `HAPPO_TARGETS` you can iterate the test for each case test
([Example](https://github.com/toptal/picasso/pull/3756/files)):

```ts
import { HAPPO_TARGETS } from '@toptal/picasso-test-utils'

describe('test 1', () => {
  Cypress._.each(HAPPO_TARGETS, target => {
    const { width } = target

    describe(`when on width ${width}`, () => {
      cy.viewport(width, 1000)
      cy.mount(<Foo />)

      cy.get('body').happoScreenshot({
        component,
        variant: `foo-component/${width}-initial`,
        targets: [target],
      })
    })
  })
})
```
