import React from 'react'
import { ProgressBar } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('ProgressBar', () => {
  it('renders', () => {
    mount(
      <TestingPicasso>
        <ProgressBar value={50} />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders empty progress bar when value  <= 0', () => {
    mount(
      <TestingPicasso>
        <ProgressBar value={0} />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  it('renders full progress bar when value >= 100', () => {
    mount(
      <TestingPicasso>
        <ProgressBar value={100} />
      </TestingPicasso>
    )

    cy.get('body').happoScreenshot()
  })

  describe('with percentage', () => {
    it('renders', () => {
      mount(
        <TestingPicasso>
          <ProgressBar value={50} showPercentage />
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })

    it('renders empty progress bar when value <= 0', () => {
      mount(
        <TestingPicasso>
          <ProgressBar value={0} showPercentage />
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })

    it('renders full progress bar when value >= 100', () => {
      mount(
        <TestingPicasso>
          <ProgressBar value={100} showPercentage />
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })
  })
})
