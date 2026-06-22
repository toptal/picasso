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

// Wait for the modal's open fade (data-starting-style:opacity-0 → 1) to settle
// before taking the screenshot. Capturing mid-fade composites the (only)
// bordered button — the secondary Cancel — at partial opacity, producing edge
// artifacts on its border.
const waitForModalOpen = () =>
  cy
    .get('[role="dialog"]')
    .should('be.visible')
    .and('not.have.attr', 'data-starting-style')

describe('PromptModal', () => {
  it('renders on desktop and mobile', () => {
    cy.mount(<TestProptModal />)

    waitForModalOpen()

    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })

    cy.get('body').happoScreenshot({
      component,
      variant: 'to-small-target',
      targets: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        { name: 'chrome-small', browser: 'chrome', viewport: '400x800' },
      ],
    })
  })
})
