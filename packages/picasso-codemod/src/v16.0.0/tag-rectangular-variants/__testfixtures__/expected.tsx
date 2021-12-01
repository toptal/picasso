// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Tag } from '@toptal/picasso'

const defaultProps = {
  'data-testid': 'foo',
  className: 'bar',
  style: { position: 'absolute' }
}

export default () => (
  <>
    <Tag.Rectangular {...defaultProps} variant='red'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} variant='yellow'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} variant='green'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} variant='dark-grey'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} variant='light-grey'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='red'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='yellow'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='green'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='blue'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps} indicator='light-grey'>
      Label
    </Tag.Rectangular>
    <Tag.Rectangular {...defaultProps}>Label</Tag.Rectangular>
  </>
)
