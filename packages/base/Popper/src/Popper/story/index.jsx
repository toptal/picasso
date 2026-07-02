import { Popper } from '../Popper'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Overlays').createPage(
  'Popper',
  `
    Popper is a low-level positioning primitive. It anchors floating content to a reference element and handles placement, overflow avoidance, and portal rendering.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Popper,
  name: 'Popper',
  additionalDocs: {
    children: {
      name: 'children',
      type: 'ReactNode',
      description: 'Content to position inside the popper',
    },
    open: {
      name: 'open',
      type: 'boolean',
      description: 'If true, the popper is visible',
      defaultValue: 'false',
    },
    anchorEl: {
      name: 'anchorEl',
      type: 'null | PopperReferenceObject | (() => PopperReferenceObject)',
      required: true,
      description:
        'HTML Element instance or a referenceObject used to position the popper',
    },
    placement: {
      name: 'placement',
      type: {
        name: 'enum',
        enums: [
          'bottom-end',
          'bottom-start',
          'bottom',
          'left-end',
          'left-start',
          'left',
          'right-end',
          'right-start',
          'right',
          'top-end',
          'top-start',
          'top',
        ],
      },
      description: 'Popper placement relative to the anchor element',
      defaultValue: 'bottom',
    },
    disablePortal: {
      name: 'disablePortal',
      type: 'boolean',
      description:
        'Disable portal rendering — children stay within the parent DOM hierarchy',
      defaultValue: 'false',
    },
    strategy: {
      name: 'strategy',
      type: {
        name: 'enum',
        enums: ['absolute', 'fixed'],
      },
      description: `
CSS positioning strategy for the underlying \`useFloating\` call.

- \`absolute\` (default) — the popper is positioned relative to its nearest positioned ancestor. If the popper is a real DOM descendant of a scrolling or \`overflow: hidden\` container (i.e. \`disablePortal\`, or a custom \`container\` nested inside one), it gets clipped by that container's edge and scrolls with it.
- \`fixed\` — the popper is positioned relative to the viewport instead, escaping that clipping/scrolling ancestor. Positioning still recomputes on scroll/resize either way (\`autoUpdate\`); \`strategy\` only changes what the coordinates are measured against, not whether they update.

Not needed for the default portaled case — portaling already moves the popper out of the clipping container's DOM subtree regardless of strategy. See the "Fixed Strategy" example below.

Defaults to \`popperOptions.positionFixed ? 'fixed' : 'absolute'\` for popper.js v1 compatibility; an explicit \`strategy\` prop always overrides \`popperOptions.positionFixed\`.
      `,
      defaultValue: 'absolute',
    },
    keepMounted: {
      name: 'keepMounted',
      type: 'boolean',
      description: 'Always keep the popper children in the DOM',
      defaultValue: 'false',
    },
    autoWidth: {
      name: 'autoWidth',
      type: 'boolean',
      description:
        'Automatically resize the popper to match the anchor element width',
      defaultValue: 'true',
    },
    width: {
      name: 'width',
      type: 'string',
      description: 'Explicit popper width (overrides autoWidth)',
    },
    enableCompactMode: {
      name: 'enableCompactMode',
      type: 'boolean',
      description: 'Take full window width on small and medium screens',
      defaultValue: 'false',
    },
    container: {
      name: 'container',
      type: 'HTMLElement | (() => HTMLElement)',
      description:
        'Container node for the portal. Defaults to the Picasso root node',
    },
    popperOptions: {
      name: 'popperOptions',
      type: 'object',
      description: `
Options forwarded to the popper instance, including \`onCreate\` and \`onUpdate\` lifecycle callbacks and popper.js v1-shaped \`modifiers\` (\`flip\`, \`offset\`, \`preventOverflow\`, \`hide\`).

\`positionFixed\` is also accepted here for popper.js v1 compatibility — \`positionFixed: true\` behaves like \`strategy="fixed"\`. It's deprecated; prefer the \`strategy\` prop in new code.
      `,
    },
  },
})

page
  .createChapter()
  .addExample(
    'Popper/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/Popper'
  )
  .addExample(
    'Popper/story/Placement.example.tsx',
    {
      title: 'Placement',
      takeScreenshot: false,
    },
    'base/Popper'
  )
  .addExample(
    'Popper/story/DisablePortal.example.tsx',
    {
      title: 'Disable Portal',
      takeScreenshot: false,
    },
    'base/Popper'
  )
  .addExample(
    'Popper/story/InsideModal.example.tsx',
    {
      title: 'Inside Modal',
      takeScreenshot: false,
    },
    'base/Popper'
  )
  .addExample(
    'Popper/story/FixedStrategy.example.tsx',
    {
      title: 'Fixed Strategy',
      takeScreenshot: false,
    },
    'base/Popper'
  )
