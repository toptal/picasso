import React from 'react'
import { EmojiPlugin } from '@toptal/picasso-rich-text-editor'

import {
  Editor,
  editorSelector,
  makeEditorProps,
  resultContainerTestId,
} from './test-helpers'

// EmojiPlugin renders its toolbar trigger with this fixed id
const emojiTriggerSelector = '#trigger-emoji-picker'
// first entry of emoji-mart's default "Frequently used" row, so it is
// rendered as soon as the picker opens
const emoji = '👍'

const defaultProps = makeEditorProps()

describe('EmojiPlugin', () => {
  it('inserts the picked emoji into the editor', () => {
    cy.mount(<Editor {...defaultProps} plugins={[<EmojiPlugin />]} />)

    cy.get(editorSelector).click()
    cy.get(editorSelector).type('hello ')
    cy.get(emojiTriggerSelector).realClick()

    // the wrapper two levels above the emoji-mart element fades the picker in
    cy.get('em-emoji-picker').parent().parent().should('be.visible')

    // emoji-mart renders inside a shadow root and labels each grid button
    // with the emoji it inserts. Not a forced click: the open picker has to
    // receive pointer events itself, or the click lands on the editor
    // underneath and emoji-mart treats it as a click outside
    cy.get('em-emoji-picker')
      .shadow()
      .find(`button[aria-label="${emoji}"]`)
      // the same emoji is listed under "Frequently used" and its own category
      .first()
      .click()

    cy.get(editorSelector).should('contain.text', `hello ${emoji}`)
    cy.getByTestId(resultContainerTestId).should('contain.text', emoji)
  })

  it('stays open on a click between emojis', () => {
    cy.mount(<Editor {...defaultProps} plugins={[<EmojiPlugin />]} />)

    cy.get(editorSelector).click()
    cy.get(editorSelector).type('hello ')
    cy.get(emojiTriggerSelector).realClick()
    cy.get('em-emoji-picker').parent().parent().should('be.visible')

    // the gap can't take focus, so the click focuses the editor's wrapper
    cy.get('em-emoji-picker')
      .shadow()
      .find('.row')
      .first()
      .realClick({ position: 'right' })

    cy.get('em-emoji-picker').parent().parent().should('be.visible')
  })

  it('opens with one click in a new editor once emoji-mart has loaded', () => {
    const openPicker = () => {
      cy.mount(<Editor {...defaultProps} plugins={[<EmojiPlugin />]} />)
      cy.get(editorSelector).click()
      cy.get(editorSelector).type('hello ')
      cy.get(emojiTriggerSelector).realClick()
      cy.get('em-emoji-picker').parent().parent().should('be.visible')
    }

    openPicker()
    // with emoji-mart loaded, the new picker is created during the toggle's
    // click, and emoji-mart must not treat that click as outside
    openPicker()
  })
})
