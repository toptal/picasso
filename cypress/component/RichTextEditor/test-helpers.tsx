import React, { useState } from 'react'
import type { RichTextEditorProps } from '@toptal/picasso-rich-text-editor'
import { RichTextEditor } from '@toptal/picasso-rich-text-editor'
import { Container } from '@toptal/picasso'

export const component = 'RichTextEditor'

export const editorTestId = 'editor'
export const resultContainerTestId = 'result-container'

const EDITOR_ID = 'foo'

export const editorSelector = `#${EDITOR_ID}`

// Base props shared by every RTE spec. Typed as Record so plugin-specific
// testIds (not in RichTextEditorProps['testIds']) pass through.
export const makeEditorProps = (testIds: Record<string, string> = {}) => ({
  id: EDITOR_ID,
  onChange: () => {},
  placeholder: 'placeholder',
  testIds: { editor: editorTestId, ...testIds },
})

// Renders the editor plus its serialized value, so specs can assert the
// emitted HTML alongside the visual state.
export const Editor = (props: RichTextEditorProps) => {
  const [value, setValue] = useState('')

  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles -- test-only cap, kept inline so it can't depend on Tailwind generation
    <Container style={{ maxWidth: '600px' }} padded='small'>
      <RichTextEditor {...props} onChange={setValue} />
      <Container padded='small' data-testid={resultContainerTestId}>
        {value}
      </Container>
    </Container>
  )
}

const ACTIVE_TOOLBAR_BUTTON_CLASS = 'bg-graphite-700'

export const buttonShouldBeActive = (
  button: Cypress.Chainable<JQuery<HTMLButtonElement>>
) => {
  button
    .should('have.attr', 'class')
    .and('include', ACTIVE_TOOLBAR_BUTTON_CLASS)
}

export const buttonShouldNotBeActive = (
  button: Cypress.Chainable<JQuery<HTMLButtonElement>>
) => {
  button
    .should('have.attr', 'class')
    .and('not.include', ACTIVE_TOOLBAR_BUTTON_CLASS)
}

// Fills and saves the link dialog. `toggleNewTab` clicks "Open in new tab",
// flipping whatever state the dialog opened with.
export const saveLink = (
  url: string,
  { text, toggleNewTab }: { text?: string; toggleNewTab?: boolean } = {}
) => {
  if (text !== undefined) {
    cy.get('#rte-link-text').clear()
    cy.get('#rte-link-text').type(text)
  }
  cy.get('#rte-link-url').clear()
  cy.get('#rte-link-url').type(url)
  if (toggleNewTab) {
    cy.getByRole('dialog').contains('Open in new tab').click()
  }
  cy.getByRole('dialog').contains('button', 'Save').click()
  cy.getByRole('dialog').should('not.exist')
}
