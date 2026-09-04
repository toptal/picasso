import React from 'react'
import { version as reactDomVersion } from 'react-dom'

// Proves which React the component tests run on: the workspace's React 18 by
// default, the standalone react19/ install when CYPRESS_REACT_19=1 (exposed to
// specs as Cypress.env('REACT_19')). Guards the alias wiring in
// cypress.config.mjs — a broken alias would silently test React 18 twice.
const Probe = () => (
  <div data-testid='react-version'>
    {React.version}/{reactDomVersion}
  </div>
)

describe('React runtime', () => {
  it('mounts the React major the run was configured for', () => {
    // Cypress coerces numeric env values, so CYPRESS_REACT_19=1 arrives as the number 1
    const expectedMajor = String(Cypress.env('REACT_19')) === '1' ? '19' : '18'

    cy.mount(<Probe />)

    cy.getByTestId('react-version')
      .invoke('text')
      .should(
        'match',
        new RegExp(`^${expectedMajor}\\.[\\d.]+/${expectedMajor}\\.`)
      )
  })
})
