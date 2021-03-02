import React from 'react'
import { mount } from '@cypress/react'
import { Drawer } from '@toptal/picasso-lab'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const DrawerInPortalExample = () => {
  return (
    <TestingPicasso>
      <Drawer open>Testing font</Drawer>
    </TestingPicasso>
  )
}

describe('Drawer', () => {
  it('renders font correctly in a portal', () => {
    mount(<DrawerInPortalExample />)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cy.get('body').happoScreenshot()
  })
})
