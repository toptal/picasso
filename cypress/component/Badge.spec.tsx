import React from 'react'
import { Badge, Container, Avatar } from '@toptal/picasso'

const component = 'Badge'

/* eslint-disable max-lines-per-function */
describe('Badge', () => {
  it('renders with defaults', () => {
    cy.mount(
      <Container padded='small' style={{ background: 'blue' }}>
        <Container padded='small'>
          <Badge content={5} />
        </Container>
      </Container>
    )
    cy.get('body').happoScreenshot({
      component,
      variant: 'default',
    })
  })

  describe('white variant', () => {
    it('renders small', () => {
      cy.mount(
        <Container flex style={{ background: 'blue' }} padded='small'>
          <Container padded='small'>
            <Badge variant='white' size='small' content={1} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='small' content={5} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='small' content={9} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='small' content={10} />
          </Container>
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'white/small-size',
      })
    })

    it('renders medium', () => {
      cy.mount(
        <Container flex style={{ background: 'blue' }} padded='small'>
          <Container padded='small'>
            <Badge variant='white' size='medium' content={1} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='medium' content={5} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='medium' content={10} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='medium' content={99} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='medium' content={200} />
          </Container>
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'white/medium-size',
      })
    })

    it('renders large', () => {
      cy.mount(
        <Container flex style={{ background: 'blue' }} padded='small'>
          <Container padded='small'>
            <Badge variant='white' size='large' content={1} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='large' content={5} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='large' content={10} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='large' content={99} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='large' content={200} />
          </Container>
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'white/large-size',
      })
    })

    it('renders custom max count', () => {
      cy.mount(
        <Container
          flex
          style={{ background: 'blue' }}
          padded='small'
          alignItems='center'
        >
          <Container padded='small'>
            <Badge variant='white' size='small' content={9999} max={999} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='medium' content={9999} max={999} />
          </Container>
          <Container padded='small'>
            <Badge variant='white' size='large' content={9999} max={999} />
          </Container>
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'white/custom-max-count',
      })
    })
  })
  describe('red variant', () => {
    it('renders small', () => {
      cy.mount(
        <Container flex padded='small'>
          <Container padded='small'>
            <Badge variant='red' size='small' content={1} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='small' content={5} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='small' content={9} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='small' content={10} />
          </Container>
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'red/small-size',
      })
    })

    it('renders medium', () => {
      cy.mount(
        <Container flex padded='small'>
          <Container padded='small'>
            <Badge variant='red' size='medium' content={1} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='medium' content={5} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='medium' content={10} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='medium' content={99} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='medium' content={200} />
          </Container>
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'red/medium-size',
      })
    })

    it('renders large', () => {
      cy.mount(
        <Container flex padded='small'>
          <Container padded='small'>
            <Badge variant='red' size='large' content={1} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='large' content={5} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='large' content={10} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='large' content={99} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='large' content={200} />
          </Container>
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'red/large-size',
      })
    })

    it('renders custom max count', () => {
      cy.mount(
        <Container
          flex
          style={{ background: 'blue' }}
          padded='small'
          alignItems='center'
        >
          <Container padded='small'>
            <Badge variant='red' size='small' content={9999} max={999} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='medium' content={9999} max={999} />
          </Container>
          <Container padded='small'>
            <Badge variant='red' size='large' content={9999} max={999} />
          </Container>
        </Container>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'red/custom-max-count',
      })
    })

    it('renders overlay badge', () => {
      cy.mount(
        <>
          <Container
            flex
            style={{ background: 'blue' }}
            padded='small'
            alignItems='center'
          >
            <Container padded='small'>
              <Badge variant='red' size='small' content={9999} max={999}>
                <Avatar name='Foo Bar' />
              </Badge>
            </Container>

            <Container padded='small'>
              <Badge variant='red' size='medium' content={9999} max={999}>
                <Avatar name='Foo Bar' />
              </Badge>
            </Container>

            <Container padded='small'>
              <Badge variant='red' size='large' content={9999} max={999}>
                <Avatar name='Foo Bar' />
              </Badge>
            </Container>
          </Container>

          <Container
            flex
            style={{ background: 'blue' }}
            padded='small'
            alignItems='center'
          >
            <Container padded='small'>
              <Badge variant='white' size='small' content={9999} max={999}>
                <Avatar name='Foo Bar' />
              </Badge>
            </Container>

            <Container padded='small'>
              <Badge variant='white' size='medium' content={9999} max={999}>
                <Avatar name='Foo Bar' />
              </Badge>
            </Container>

            <Container padded='small'>
              <Badge variant='white' size='large' content={9999} max={999}>
                <Avatar name='Foo Bar' />
              </Badge>
            </Container>
          </Container>
        </>
      )
      cy.get('body').happoScreenshot({
        component,
        variant: 'overlay',
      })
    })
  })
})
