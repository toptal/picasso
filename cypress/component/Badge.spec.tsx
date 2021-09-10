import React from 'react'
import { Badge, Container } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

describe('Badge', () => {
  it('renders with defaults', () => {
    mount(
      <TestingPicasso>
        <Container padded='small' style={{ background: 'blue' }}>
          <Badge content={5} />
        </Container>
      </TestingPicasso>
    )
    cy.get('body').happoScreenshot()
  })
  describe('white variant', () => {
    it('renders small', () => {
      mount(
        <TestingPicasso>
          <Container
            flex
            style={{ gap: '1rem', background: 'blue' }}
            padded='small'
          >
            <Badge variant='white' size='small' content={1} />
            <Badge variant='white' size='small' content={5} />
            <Badge variant='white' size='small' content={9} />
            <Badge variant='white' size='small' content={10} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders medium', () => {
      mount(
        <TestingPicasso>
          <Container
            flex
            style={{ gap: '1rem', background: 'blue' }}
            padded='small'
          >
            <Badge variant='white' size='medium' content={1} />
            <Badge variant='white' size='medium' content={5} />
            <Badge variant='white' size='medium' content={10} />
            <Badge variant='white' size='medium' content={99} />
            <Badge variant='white' size='medium' content={200} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders large', () => {
      mount(
        <TestingPicasso>
          <Container
            flex
            style={{ gap: '1rem', background: 'blue' }}
            padded='small'
          >
            <Badge variant='white' size='large' content={1} />
            <Badge variant='white' size='large' content={5} />
            <Badge variant='white' size='large' content={10} />
            <Badge variant='white' size='large' content={99} />
            <Badge variant='white' size='large' content={200} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders custom max count', () => {
      mount(
        <TestingPicasso>
          <Container
            flex
            style={{ gap: '1rem', background: 'blue' }}
            padded='small'
            alignItems='center'
          >
            <Badge variant='white' size='small' content={9999} max={999} />
            <Badge variant='white' size='medium' content={9999} max={999} />
            <Badge variant='white' size='large' content={9999} max={999} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
  })
  describe('red variant', () => {
    it('renders small', () => {
      mount(
        <TestingPicasso>
          <Container flex style={{ gap: '1rem' }} padded='small'>
            <Badge variant='red' size='small' content={1} />
            <Badge variant='red' size='small' content={5} />
            <Badge variant='red' size='small' content={9} />
            <Badge variant='red' size='small' content={10} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders medium', () => {
      mount(
        <TestingPicasso>
          <Container flex style={{ gap: '1rem' }} padded='small'>
            <Badge variant='red' size='medium' content={1} />
            <Badge variant='red' size='medium' content={5} />
            <Badge variant='red' size='medium' content={10} />
            <Badge variant='red' size='medium' content={99} />
            <Badge variant='red' size='medium' content={200} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders large', () => {
      mount(
        <TestingPicasso>
          <Container flex style={{ gap: '1rem' }} padded='small'>
            <Badge variant='red' size='large' content={1} />
            <Badge variant='red' size='large' content={5} />
            <Badge variant='red' size='large' content={10} />
            <Badge variant='red' size='large' content={99} />
            <Badge variant='red' size='large' content={200} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
    it('renders custom max count', () => {
      mount(
        <TestingPicasso>
          <Container
            flex
            style={{ gap: '1rem', background: 'blue' }}
            padded='small'
            alignItems='center'
          >
            <Badge variant='red' size='small' content={9999} max={999} />
            <Badge variant='red' size='medium' content={9999} max={999} />
            <Badge variant='red' size='large' content={9999} max={999} />
          </Container>
        </TestingPicasso>
      )
      cy.get('body').happoScreenshot()
    })
  })
})
