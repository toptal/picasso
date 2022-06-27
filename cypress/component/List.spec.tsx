import React from 'react'
import { Container, List } from '@toptal/picasso'

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
  describe('when inside reduced font-size container', () => {
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
