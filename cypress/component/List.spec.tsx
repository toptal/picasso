import React from 'react'
import { Container, List, Referrals16 } from '@toptal/picasso'

/* eslint-disable react/no-array-index-key */
const generateListItems = (total: number, listItemProps?: any) =>
  Array(total)
    .fill(0)
    .map((_, index) => (
      <List.Item key={index} {...listItemProps}>
        {`list item N${index + 1}`}
      </List.Item>
    ))

const component = 'List'

describe('List', () => {
  describe('Unordered', () => {
    it('renders unordered', () => {
      cy.mount(<List>{generateListItems(5)}</List>)

      cy.get('body').happoScreenshot({
        component,
        variant: 'unordered',
      })
    })

    it('renders with custom icons', () => {
      const listItemProps = {
        icon: <Referrals16 />,
      }

      cy.mount(<List>{generateListItems(5, listItemProps)}</List>)

      cy.get('body').happoScreenshot({
        component,
        variant: 'custom-icons',
      })
    })

    context('when put into reduced font-size container', () => {
      // eslint-disable-next-line max-nested-callbacks
      it('aligns bullets correctly', () => {
        cy.mount(
          <Container style={{ fontSize: '0.825rem' }}>
            <List>{generateListItems(5)}</List>
          </Container>
        )

        cy.get('body').happoScreenshot({
          component,
          variant: 'inside-reduced-font-size-container',
        })
      })
    })
  })

  describe('Ordered', () => {
    it('renders ordered', () => {
      cy.mount(<List variant='ordered'>{generateListItems(5)}</List>)

      cy.get('body').happoScreenshot({
        component,
        variant: 'ordered',
      })
    })

    it('renders with custom start', () => {
      cy.mount(
        <List variant='ordered' start={9} data-testid='list'>
          {generateListItems(5)}
        </List>
      )

      cy.getByTestId('list').children().last().contains(13)
    })
  })
})
