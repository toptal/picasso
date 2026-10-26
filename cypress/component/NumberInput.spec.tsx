import React, { useState } from 'react'
import { NumberInput } from '@toptal/picasso'

const TestNumberInput = () => {
  const [value, setValue] = useState('1')

  return (
    <>
      <NumberInput
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      <button>After</button>
    </>
  )
}

describe('NumberInput', () => {
  it('moves the focus past the step buttons on Tab', () => {
    cy.mount(<TestNumberInput />)

    cy.get('input[type="number"]').realClick()
    cy.realPress('Tab')

    cy.contains('After').should('have.focus')
  })

  it('steps the value with the arrow keys', () => {
    cy.mount(<TestNumberInput />)

    cy.get('input[type="number"]').realClick()
    cy.realPress('ArrowUp')

    cy.get('input[type="number"]').should('have.value', '2')
  })
})
