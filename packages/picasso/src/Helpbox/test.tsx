import React, { FunctionComponent } from 'react'
import { render } from '@testing-library/react'
import Picasso, { OmitInternalProps } from '@toptal/picasso-shared'

import Helpbox, { Props } from './Helpbox'
import Button from '../Button'

const TestHelpbox: FunctionComponent<OmitInternalProps<Props>> = ({
  children
}) => (
  <Picasso loadFonts={false}>
    <Helpbox>
      <Helpbox.Title>Title</Helpbox.Title>
      <Helpbox.Content>{children}</Helpbox.Content>
      <Helpbox.Actions>
        <Button>Button</Button>
      </Helpbox.Actions>
    </Helpbox>
  </Picasso>
)

describe('Helpbox', () => {
  test('default render', () => {
    const { container } = render(<TestHelpbox>Test</TestHelpbox>)

    expect(container).toMatchSnapshot()
  })
})
