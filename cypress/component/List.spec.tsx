import React from 'react'
import { List, Referrals16 } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'

/* eslint-disable react/no-array-index-key */
const generateListItems = (total: number, listItemProps?: any) =>
  Array(total)
    .fill(0)
    .map((_, index) => (
      <List.Item key={index} {...listItemProps}>
        {`list item N${index + 1}`}
      </List.Item>
    ))

describe('List', () => {
  describe('Unordered', () => {
    it('renders unordered', () => {
      mount(
        <TestingPicasso>
          <List>{generateListItems(5)}</List>
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })

    it('renders with custom icons', () => {
      const listItemProps = {
        icon: <Referrals16 />
      }

      mount(
        <TestingPicasso>
          <List>{generateListItems(5, listItemProps)}</List>
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })
  })

  describe('Ordered', () => {
    it('renders ordered', () => {
      mount(
        <TestingPicasso>
          <List variant='ordered'>{generateListItems(5)}</List>
        </TestingPicasso>
      )

      cy.get('body').happoScreenshot()
    })

    it('renders with custom start', () => {
      mount(
        <TestingPicasso>
          <List variant='ordered' start={9} data-testid='list'>
            {generateListItems(5)}
          </List>
        </TestingPicasso>
      )

      cy.get('[data-testid="list"').children().last().contains(13)
    })
  })
})
