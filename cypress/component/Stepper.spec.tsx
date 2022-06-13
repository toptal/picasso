import React from 'react'
import { Stepper, Container } from '@toptal/picasso'

const STEPS = ['Step 1', 'Step 2', 'Step 3', 'Step 4']

describe('Stepper', () => {
  describe('with label', () => {
    it('renders without active', () => {
      cy.mount(
        <Container padded='medium'>
          <Stepper steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })

    it('renders first step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={1} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders third step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={3} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders all steps active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={4} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
  })

  describe('without label', () => {
    it('renders without active', () => {
      cy.mount(
        <Container padded='medium'>
          <Stepper steps={STEPS} hideLabels />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })

    it('renders first step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={1} steps={STEPS} hideLabels />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders third step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={3} steps={STEPS} hideLabels />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders all steps active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={4} steps={STEPS} hideLabels />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
  })

  describe('vertical', () => {
    it('renders without active', () => {
      cy.mount(
        <Container padded='medium'>
          <Stepper.Vertical steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })

    it('renders first step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper.Vertical active={1} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders third step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper.Vertical active={3} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders all steps active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper.Vertical active={4} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot()
    })
  })
})
