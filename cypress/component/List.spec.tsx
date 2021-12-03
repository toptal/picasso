import React from 'react'
import { List, Referrals16 } from '@toptal/picasso'
import { mount } from '@cypress/react'
import { TestingPicasso } from '@toptal/picasso/test-utils'
import { generateListItems } from '@toptal/picasso/src/List/utils'

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
