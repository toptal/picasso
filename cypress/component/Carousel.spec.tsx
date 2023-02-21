import React from 'react'
import {
  Carousel,
  Container,
  Settings16,
  Typography,
  CarouselProps,
  Button,
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
    <Carousel autoplay={false} testIds={testIds} {...props}>
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
    it('renders without arrows', () => {
      cy.mount(<CarouselExample hideArrows />)

      // make sure that carousel is initialized
      cy.getByTestId(testIds.arrows).should('not.exist')
      cy.getByTestId(testIds.dots).should('exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'hide-arrows',
      })
    })
    it('renders without dots', () => {
      cy.mount(<CarouselExample hideDots />)

      // make sure that carousel is initialized
      cy.getByTestId(testIds.arrows).should('exist')
      cy.getByTestId(testIds.dots).should('not.exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'hide-dots',
      })
    })
    it('renders without navigation', () => {
      cy.mount(<CarouselExample hideDots hideArrows />)

      // make sure that carousel is initialized
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
          cy.mount(<CarouselExample />)

          // make sure that carousel is initialized
          cy.getByTestId(testIds.arrows).should('exist')
          cy.getByTestId(testIds.dots).should('exist')

          cy.getByTestId(testIds.prev).should('not.be.disabled')

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-enabled/first-item',
          })

          // move to last item
          cy.getByTestId(testIds.next).hoverAndTakeHappoScreenshot({
            component,
            variant: 'arrow/after-hovered',
          })

          cy.getByTestId(testIds.next)
            .click()
            .click()
            .click()
            .click()
            .should('not.be.disabled')

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-enabled/last-item',
          })

          cy.getByTestId(testIds.next).click()

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-enabled/rewinded-to-first-item',
          })
        })
      })

      describe('when rewind is disabled', () => {
        it('is ends on last slide', () => {
          cy.mount(<CarouselExample rewind={false} />)

          // make sure that carousel is initialized
          cy.getByTestId(testIds.arrows).should('exist')
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

          cy.get('body').happoScreenshot({
            component,
            variant: 'rewind-disabled/last-item',
          })
        })
      })
    })
    describe('dots', () => {
      it('slides on dot click', () => {
        cy.mount(<CarouselExample />)

        // make sure that carousel is initialized
        cy.getByTestId(testIds.arrows).should('exist')
        cy.getByTestId(testIds.dots).should('exist')

        cy.getByTestId(testIds.dots)
          .find('[data-index="1"]')
          .as('dotTwo')
          .hoverAndTakeHappoScreenshot({
            component,
            variant: 'default-checked/after-hovered',
          })

        cy.get('@dotTwo').click()

        cy.get('body').happoScreenshot({
          component,
          variant: 'dots/after-click',
        })
      })
    })
  })
  describe('header and footer', () => {
    it('renders with header', () => {
      cy.mount(
        <CarouselExample
          header={<Typography variant='heading'>Header</Typography>}
        />
      )
      // make sure that carousel is initialized
      cy.getByTestId(testIds.arrows).should('exist')
      cy.getByTestId(testIds.dots).should('exist')
      cy.getByTestId(testIds.header).should('exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-header',
      })
    })
    it('renders with footer', () => {
      cy.mount(<CarouselExample footer={<Button>Action</Button>} />)
      // make sure that carousel is initialized
      cy.getByTestId(testIds.arrows).should('exist')
      cy.getByTestId(testIds.dots).should('exist')
      cy.getByTestId(testIds.footer).should('exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-footer',
      })
    })
    it('renders with header and footer', () => {
      cy.mount(
        <CarouselExample
          header={<Typography variant='heading'>Header</Typography>}
          footer={<Button>Action</Button>}
        />
      )
      // make sure that carousel is initialized
      cy.getByTestId(testIds.arrows).should('exist')
      cy.getByTestId(testIds.dots).should('exist')
      cy.getByTestId(testIds.footer).should('exist')
      cy.getByTestId(testIds.header).should('exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'with-header-and-footer',
      })
    })
  })

  describe('slides to show', () => {
    it('renders gradient over partially visible item', () => {
      cy.mount(<CarouselExample slidesToShow={2.5} />)

      // make sure that carousel is initialized
      cy.getByTestId(testIds.arrows).should('exist')
      cy.getByTestId(testIds.dots).should('exist')

      cy.get('body').happoScreenshot({
        component,
        variant: 'slides-to-show/with-gradient',
      })
    })
  })
})
