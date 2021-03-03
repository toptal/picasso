import React from 'react'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { PromptModal } from '@toptal/picasso'
import { noop } from '@toptal/picasso/utils'

describe('PromptModal', () => {
  it('renders on desktop and mobile', () => {
    mount(
      <TestingPicasso>
        <PromptModal
          open
          title='Confirm'
          message='Hello, World!'
          onSubmit={noop}
          submitText='OK'
        />
      </TestingPicasso>
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('body').happoScreenshot()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('body').happoScreenshot({
      component: 'PromptModal',
      targets: [
        { name: 'chrome-small', browser: 'chrome', viewport: '400x800' }
      ]
    })
  })
})
