import React from 'react'
import { FormAutoSaveIndicator } from '@toptal/picasso-form'

const Wrapper = () => {
  const [saving, setSaving] = React.useState(true)

  return (
    <>
      <FormAutoSaveIndicator saving={saving} />
      <button onClick={() => setSaving(!saving)}>Toggle saving</button>
    </>
  )
}

describe('FormAutoSaveIndicator', () => {
  describe('in initial state', () => {
    it('hides label', () => {
      cy.mount(<FormAutoSaveIndicator />)
      cy.contains('Saved').should('not.be.visible')
    })
  })

  describe('when saving', () => {
    it('hides label', () => {
      cy.mount(<FormAutoSaveIndicator saving />)
      cy.contains('Saved').should('not.be.visible')
    })
  })

  describe('when saved', () => {
    it('should show label', () => {
      cy.mount(<Wrapper />)
        .get('button')
        .click()

      cy.contains('Saved').should('be.visible')
    })
  })
})
