import React from 'react'
import { ProgressBar } from '@toptal/picasso'

describe('ProgressBar', () => {
  it('renders', () => {
    cy.mount(<ProgressBar value={50} />)

    cy.get('body').happoScreenshot()
  })

  it('renders empty progress bar when value  <= 0', () => {
    cy.mount(<ProgressBar value={0} />)

    cy.get('body').happoScreenshot()
  })

  it('renders full progress bar when value >= 100', () => {
    cy.mount(<ProgressBar value={100} />)

    cy.get('body').happoScreenshot()
  })

  describe('with percentage', () => {
    it('renders', () => {
      cy.mount(<ProgressBar value={50} showPercentage />)

      cy.get('body').happoScreenshot()
    })

    it('renders empty progress bar when value <= 0', () => {
      cy.mount(<ProgressBar value={0} showPercentage />)

      cy.get('body').happoScreenshot()
    })

    it('renders full progress bar when value >= 100', () => {
      cy.mount(<ProgressBar value={100} showPercentage />)

      cy.get('body').happoScreenshot()
    })
  })
})
