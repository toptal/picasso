import React from 'react'
import { FormNonCompound, Input } from '@toptal/picasso-forms'

const formatCurrency = (value?: number | string) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  const numeric =
    typeof value === 'number'
      ? value
      : Number.parseFloat(value.replace(/,/g, ''))

  if (Number.isNaN(numeric)) {
    return ''
  }

  return numeric.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const parseCurrency = (value?: string) => {
  if (value === undefined || value === null) {
    return undefined
  }

  // Keep raw input while typing; strip commas for consistency.
  return value.replace(/,/g, '')
}

type CurrencyFormProps = {
  initialAmount?: number | string
}

const CurrencyForm = ({ initialAmount = 10 }: CurrencyFormProps) => (
  <FormNonCompound
    onSubmit={() => undefined}
    initialValues={{ amount: initialAmount }}
  >
    <Input
      name='amount'
      label='Amount'
      format={formatCurrency}
      parse={parseCurrency}
      formatOnBlur
    />
  </FormNonCompound>
)

describe('Form Input formatOnBlur', () => {
  it('shows formatted initial value and keeps it on focus', () => {
    cy.mount(<CurrencyForm initialAmount={10} />)

    cy.get('input[name="amount"]').should('have.value', '10.00')

    cy.get('input[name="amount"]').focus()
    cy.get('input[name="amount"]').should('have.value', '10.00')

    // does not format automatically when you type initial value again
    cy.get('input[name="amount"]').as('input')
    cy.get('@input').clear()
    cy.get('@input').type('10')
    cy.get('@input').should('have.value', '10')

    cy.get('@input').blur()
    cy.get('@input').should('have.value', '10.00')
  })

  it('formats on blur after typing a different value with or without decimals', () => {
    cy.mount(<CurrencyForm initialAmount={10} />)

    cy.get('input[name="amount"]').as('input')
    cy.get('@input').clear()
    cy.get('@input').type('20')
    cy.get('@input').should('have.value', '20')

    cy.get('@input').blur()
    cy.get('@input').should('have.value', '20.00')

    cy.get('@input').clear()
    cy.get('@input').type('1.2')
    cy.get('@input').should('have.value', '1.2')

    cy.get('@input').blur()
    cy.get('@input').should('have.value', '1.20')
  })
})
