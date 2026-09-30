// url=https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=271-12227
// source=https://github.com/toptal/picasso/blob/master/packages/base/EmptyState/src/EmptyState/EmptyState.tsx
// component=EmptyState.Page

import figma from 'figma'

// Branch per variant; no default, else first.

let template

if (figma.selectedInstance.getPropertyValue('Primary CTA') === true) {
  template = {
    id: 'EmptyState.Page',
    imports: [
      "import { Button, Container, EmptyState } from '@toptal/picasso'",
      "import { SearchIcon } from '@toptal/picasso-icons'",
    ],
    example: figma.code`<EmptyState.Page image={<SearchIcon />} title='Empty State Headline'>
      Add an optional description with more context on the empty state.
      <Container top='medium'>
        <Button>Primary Action</Button>
      </Container>
    </EmptyState.Page>`,
  }
} else if (figma.selectedInstance.getPropertyValue('Primary CTA') === false) {
  template = {
    id: 'EmptyState.Page',
    imports: [
      "import { EmptyState } from '@toptal/picasso'",
      "import { SearchIcon } from '@toptal/picasso-icons'",
    ],
    example: figma.code`<EmptyState.Page image={<SearchIcon />} title='Empty State Headline'>
      Add an optional description with more context on the empty state.
    </EmptyState.Page>`,
  }
} else {
  template = {
    id: 'EmptyState.Page',
    imports: [
      "import { EmptyState } from '@toptal/picasso'",
      "import { SearchIcon } from '@toptal/picasso-icons'",
    ],
    example: figma.code`<EmptyState.Page image={<SearchIcon />} title='Empty State Headline'>
      Add an optional description with more context on the empty state.
    </EmptyState.Page>`,
  }
}

export default template
