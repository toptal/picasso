// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=271-12227
// source=https://github.com/toptal/picasso/blob/master/packages/base/EmptyState/src/EmptyState/EmptyState.tsx
// component=EmptyState.Page

import figma from 'figma'

// EmptyState.Page has no CTA prop, so the Figma "Primary CTA" button is
// rendered as part of the children
const hasCta = figma.selectedInstance.getBoolean('Primary CTA')

export default {
  id: 'EmptyState.Page',
  imports: [
    hasCta
      ? "import { Button, Container, EmptyState, Search16 } from '@toptal/picasso'"
      : "import { EmptyState, Search16 } from '@toptal/picasso'",
  ],
  example: hasCta
    ? figma.code`<EmptyState.Page image={<Search16 />} title='Empty State Headline'>
  Add an optional description with more context on the empty state.
  <Container top='medium'>
    <Button>Primary Action</Button>
  </Container>
</EmptyState.Page>`
    : figma.code`<EmptyState.Page image={<Search16 />} title='Empty State Headline'>
  Add an optional description with more context on the empty state.
</EmptyState.Page>`,
}
