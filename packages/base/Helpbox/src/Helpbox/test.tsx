import React from 'react'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { Button } from '@toptal/picasso-button'

import type { Props } from './Helpbox'
import { HelpboxCompound as Helpbox } from '../HelpboxCompound'

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
