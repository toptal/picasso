import React, { useEffect } from 'react'
import { PromptModal } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

const component = 'PromptModal'

const TestProptModal = () => {
  const [isOpen, setOpen] = React.useState(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <PromptModal
      open={isOpen}
      title='Confirm'
      message='Hello, World!'
      onSubmit={noop}
      submitText='OK'
    />
  )
}

describe('PromptModal', () => {
  it('renders on desktop and mobile', () => {
    cy.mount(<TestProptModal />)
    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })

    cy.get('body').happoScreenshot({
      component,
      variant: 'to-small-target',
      targets: [
        { name: 'chrome-small', browser: 'chrome', viewport: '400x800' },
      ],
    })
  })
})
