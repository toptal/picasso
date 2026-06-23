import figma from '@figma/code-connect'
import { Breadcrumbs } from '@toptal/picasso'

const URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=122-2162'

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Current', '# of items': '2 items' },
  example: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Current', '# of items': '3 items' },
  example: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Current', '# of items': '4 items' },
  example: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Current', '# of items': '5 items' },
  example: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Detail</Breadcrumbs.Item>
      <Breadcrumbs.Item active>Current Page</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Parents', '# of items': '2 items' },
  example: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Parents', '# of items': '3 items' },
  example: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Parents', '# of items': '4 items' },
  example: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Detail</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Parents', '# of items': '5 items' },
  example: () => (
    <Breadcrumbs>
      <Breadcrumbs.Item active={false}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Section</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Subsection</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Detail</Breadcrumbs.Item>
      <Breadcrumbs.Item active={false}>Page</Breadcrumbs.Item>
    </Breadcrumbs>
  ),
})
