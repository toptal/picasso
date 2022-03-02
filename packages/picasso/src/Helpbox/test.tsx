import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Helpbox, { Props } from './Helpbox'
import Button from '../Button'

const TestHelpbox = ({ children }: OmitInternalProps<Props>) => {
  return (
    <Helpbox>
      <Helpbox.Title>Title</Helpbox.Title>
      <Helpbox.Content>{children}</Helpbox.Content>
      <Helpbox.Actions>
        <Button>Button</Button>
      </Helpbox.Actions>
    </Helpbox>
  )
}

describe('Helpbox', () => {
  it('renders', () => {
    const { container } = render(<TestHelpbox>Test</TestHelpbox>)

    expect(container).toMatchSnapshot()
  })
})
