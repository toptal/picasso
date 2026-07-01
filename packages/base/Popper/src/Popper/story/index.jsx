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
      description:
        'Options forwarded to the popper instance, including onCreate and onUpdate lifecycle callbacks',
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
