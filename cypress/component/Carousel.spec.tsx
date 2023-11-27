import React from 'react'
import type { CarouselProps } from '@toptal/picasso'
import { Carousel, Container, Settings16, Typography } from '@toptal/picasso'

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
describe('Carousel', () => {
  describe('navigation', () => {
    // if only this test, then it works fine
    it('renders with dots only', () => {
      cy.mount(<CarouselExample hasDots />)

      // Wait until navigation is visible test
      cy.getByTestId(testIds.dots).should('exist')
      cy.getByTestId(testIds.arrows).should('not.exist')

      cy.get('[data-cy-root]').happoScreenshot({
        component,
        variant: 'has-dots',
      })

      cy.getByTestId(testIds.arrows).should('not.exist')
    })

    // also worked
    it('renders with arrows only', () => {
      cy.mount(<CarouselExample hasArrows />)

      // Wait until navigation is visible
      cy.getByTestId(testIds.arrows).should('exist')
      cy.getByTestId(testIds.dots).should('not.exist')

      cy.get('[data-cy-root]').happoScreenshot({
        component,
        variant: 'has-arrows',
      })
    })

    it('renders without navigation', () => {
      cy.mount(<CarouselExample />)

      // Wait until navigation is visible
      cy.getByTestId(testIds.arrows).should('not.exist')
      cy.getByTestId(testIds.dots).should('not.exist')

      cy.get('[data-cy-root]').happoScreenshot({
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
          cy.getByTestId(testIds.dots).children().should('have.length', 3)

          cy.getByTestId(testIds.prev).should('not.be.disabled')

          cy.get('[data-cy-root]').happoScreenshot({
            component,
            variant: 'rewind-enabled/first-item',
          })

          cy.getByTestId(testIds.next).hoverAndTakeHappoScreenshot({
            component,
            variant: 'rewind-enabled/arrow-during-hovering',
          })

          // move to last item
          cy.getByTestId(testIds.next).click()
          cy.getByTestId(testIds.next).click()
          cy.getByTestId(testIds.next).click()
          cy.getByTestId(testIds.next).should('not.be.disabled')

          cy.get('[data-gslide=4]').should('have.class', 'visible')

          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(500)

          cy.get('[data-cy-root]').happoScreenshot({
            component,
            variant: 'rewind-enabled/last-item',
          })

          cy.getByTestId(testIds.next).click()
          cy.get('[data-gslide=0]').should('have.class', 'visible')

          cy.get('[data-cy-root]').happoScreenshot({
            component,
            variant: 'rewind-enabled/rewinded-to-first-item',
          })
        })
      })
    })
  })

  describe('slides to show', () => {
    it('renders gradient over partially visible item', () => {
      cy.mount(<CarouselExample slidesToShow={2.5} hasDots hasArrows rewind />)

      // Wait until navigation is visible
      cy.getByTestId(testIds.dots).should('exist')

      cy.get('[data-cy-root]').happoScreenshot({
        component,
        variant: 'slides-to-show/with-gradient-right',
      })

      cy.getByTestId(testIds.prev).click()
      cy.get('[data-gslide=4]').should('have.class', 'visible')

      cy.get('[data-cy-root]').happoScreenshot({
        component,
        variant: 'slides-to-show/with-gradient-left',
      })
    })
  })
})
