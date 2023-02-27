import React from 'react'
import {
  Carousel,
  Container,
  Settings16,
  Typography,
  CarouselProps,
} from '@toptal/picasso'

type SlideExampleProps = {
  children: React.ReactNode
  dataTestid: string
}
const SlideExample = ({ children, dataTestid }: SlideExampleProps) => {
  return (
    <div>
      <Container
        flex
        gap='xsmall'
        direction='column'
        alignItems='center'
        style={{ maxWidth: '100%' }}
        data-testid={dataTestid}
      >
        <Settings16 scale={4} color='blue' />
        <Typography align='center' size='xsmall'>
          {children}
        </Typography>
      </Container>
    </div>
  )
}

const testIds = {
  prev: 'prev',
  next: 'next',
  dots: 'dots',
  root: 'root',
  carousel: 'carousel',
  arrows: 'arrows',
  footer: 'footer',
  header: 'header',
}

const CarouselExample = (props: Partial<CarouselProps>) => (
  <Container style={{ maxWidth: 370 }}>
    <Carousel testIds={testIds} {...props}>
      <SlideExample dataTestid='delivery'>Delivery Manager</SlideExample>
      <SlideExample dataTestid='designer'>Designer</SlideExample>
      <SlideExample dataTestid='developer'>Developer</SlideExample>
      <SlideExample dataTestid='product'>Product manager</SlideExample>
      <SlideExample dataTestid='architect'>Architect</SlideExample>
    </Carousel>
  </Container>
)

const component = 'Carousel'

/* eslint-disable max-nested-callbacks */

describe(component, () => {
  describe('navigation', () => {
    it('renders with dots only', () => {
      cy.mount(<CarouselExample hasDots />)

      // Wait until navigation is visible
      cy.getByTestId(testIds.dots).should('exist')
      cy.getByTestId(testIds.arrows).should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'has-dots',
      })
    })

    it('renders with arrows only', () => {
      cy.mount(<CarouselExample hasArrows />)

      // Wait until navigation is visible
      cy.getByTestId(testIds.arrows).should('exist')
      cy.getByTestId(testIds.dots).should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'has-arrows',
      })
    })

    it('renders without navigation', () => {
      cy.mount(<CarouselExample />)

      // Wait until navigation is visible
      cy.getByTestId(testIds.arrows).should('not.exist')
      cy.getByTestId(testIds.dots).should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'hide-navigation',
      })
    })

    describe('arrows', () => {
      describe('when rewind is enabled', () => {
        it('moves back to first slide', () => {
          cy.mount(
            <CarouselExample rewind hasArrows hasDots slidesToShow={2} />
          )

          // Wait until navigation is visible
          cy.getByTestId(testIds.dots).should('exist')

          cy.getByTestId(testIds.prev).should('not.be.disabled')

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-enabled/first-item',
          })

          cy.getByTestId(testIds.next).hoverAndTakeHappoScreenshot({
            component,
            variant: 'arrow/during-hovering',
          })

          // move to last item
          cy.getByTestId(testIds.next)
            .click()
            .click()
            .click()
            .click()
            .should('not.be.disabled')

          cy.get('[data-gslide=4]').should('have.class', 'visible')

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-enabled/last-item',
          })

          cy.getByTestId(testIds.next).click()
          cy.get('[data-gslide=0]').should('have.class', 'visible')

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-enabled/rewinded-to-first-item',
          })
        })
      })

      describe('when rewind is disabled', () => {
        it('is ends on last slide', () => {
          cy.mount(<CarouselExample slidesToShow={2} hasArrows hasDots />)

          // Wait until navigation is visible
          cy.getByTestId(testIds.dots).should('exist')

          cy.getByTestId(testIds.prev).should('be.disabled')

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-disabled/first-item',
          })

          // move to last item
          cy.getByTestId(testIds.next)
            .click()
            .click()
            .click()
            .click()
            .should('be.disabled')

          cy.get('[data-gslide=4]').should('have.class', 'visible')

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-disabled/last-item',
          })
        })
      })
    })

    describe('dots', () => {
      it('slides on dot click', () => {
        cy.mount(<CarouselExample hasDots slidesToShow={2} />)

        // Wait until navigation is visible
        cy.getByTestId(testIds.dots).should('exist')

        cy.getByTestId(testIds.dots)
          .find('[data-index="1"]')
          .as('dotTwo')
          .hoverAndTakeHappoScreenshot({
            component,
            variant: 'default-checked/after-hovered',
          })

        cy.get('@dotTwo').click()

        // wait until third slide is visible
        cy.get('[data-gslide=2]').should('have.class', 'visible')

        cy.get('body').happoScreenshot({
          component,
          variant: 'dots/after-click',
        })
      })
    })
  })

  describe('slides to show', () => {
    it('renders gradient over partially visible item', () => {
      cy.mount(<CarouselExample slidesToShow={2.5} hasDots hasArrows rewind />)

      // Wait until navigation is visible
      cy.getByTestId(testIds.dots).should('exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'slides-to-show/with-gradient-right',
      })

      cy.getByTestId(testIds.prev).click()
      cy.get('[data-gslide=4]').should('have.class', 'visible')

      cy.get('body').happoScreenshot({
        component,
        variant: 'slides-to-show/with-gradient-left',
      })
    })
  })
})
