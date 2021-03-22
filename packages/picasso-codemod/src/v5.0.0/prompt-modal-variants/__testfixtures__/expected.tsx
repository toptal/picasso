// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { PromptModal } from '@toptal/picasso'

const defaultProps = {
  title: 'Test title',
  message: 'Test message',
  open: true,
  onSubmit: () => {}
}

export default () => (
  <>
    <PromptModal {...defaultProps} variant='negative' />
    <PromptModal {...defaultProps} variant='positive' />
    <PromptModal {...defaultProps} variant='positive' />
    <PromptModal {...defaultProps} variant='negative' />
    <PromptModal {...defaultProps} variant='positive' />
    <PromptModal {...defaultProps} />
  </>
)
