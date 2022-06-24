import React from 'react'
import { Stepper, Container } from '@toptal/picasso'

const STEPS = ['Step 1', 'Step 2', 'Step 3', 'Step 4']
const component = 'Stepper'

describe('Stepper', () => {
  describe('with label', () => {
    it('renders without active', () => {
      cy.mount(
        <Container padded='medium'>
          <Stepper steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'with-label',
      })
    })

    it('renders first step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={1} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'with-label/first-step-active',
      })
    })
    it('renders third step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={3} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'with-label/third-step-active',
      })
    })
    it('renders all steps active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={4} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'with-label/all-steps-active',
      })
    })
  })

  describe('without label', () => {
    it('renders without active', () => {
      cy.mount(
        <Container padded='medium'>
          <Stepper steps={STEPS} hideLabels />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'without-label',
      })
    })

    it('renders first step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={1} steps={STEPS} hideLabels />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'without-label/first-step-active',
      })
    })
    it('renders third step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={3} steps={STEPS} hideLabels />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'without-label/third-step-active',
      })
    })
    it('renders all steps active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper active={4} steps={STEPS} hideLabels />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'without-label/all-steps-active',
      })
    })
  })

  describe('vertical', () => {
    it('renders without active', () => {
      cy.mount(
        <Container padded='medium'>
          <Stepper.Vertical steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'vertical',
      })
    })

    it('renders first step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper.Vertical active={1} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'vertical/first-step-active',
      })
    })
    it('renders third step active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper.Vertical active={3} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'vertical/third-step-active',
      })
    })
    it('renders all steps active', () => {
      cy.mount(
        <Container top='small' padded='medium'>
          <Stepper.Vertical active={4} steps={STEPS} />
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'vertical/all-steps-active',
      })
    })
  })
})
