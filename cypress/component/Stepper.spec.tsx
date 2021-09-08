import React from 'react'
import { mount } from '@cypress/react'
import { Stepper, Container } from '@toptal/picasso'
import { TestingPicasso } from '@toptal/picasso/test-utils'

const STEPS = ['Step 1', 'Step 2', 'Step 3', 'Step 4']

describe('Stepper', () => {
  describe('with label', () => {
    it('renders without active', () => {
      mount(
        <TestingPicasso>
          <Container padded='medium'>
            <Stepper steps={STEPS} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })

    it('renders first step active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper active={1} steps={STEPS} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders third step active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper active={3} steps={STEPS} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders all steps active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper active={4} steps={STEPS} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
  })

  describe('without label', () => {
    it('renders without active', () => {
      mount(
        <TestingPicasso>
          <Container padded='medium'>
            <Stepper steps={STEPS} hideLabels />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })

    it('renders first step active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper active={1} steps={STEPS} hideLabels />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders third step active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper active={3} steps={STEPS} hideLabels />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders all steps active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper active={4} steps={STEPS} hideLabels />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
  })

  describe('vertical', () => {
    it('renders without active', () => {
      mount(
        <TestingPicasso>
          <Container padded='medium'>
            <Stepper.Vertical steps={STEPS} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })

    it('renders first step active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper.Vertical active={1} steps={STEPS} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders third step active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper.Vertical active={3} steps={STEPS} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders all steps active', () => {
      mount(
        <TestingPicasso>
          <Container top='small' padded='medium'>
            <Stepper.Vertical active={4} steps={STEPS} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
  })
})
