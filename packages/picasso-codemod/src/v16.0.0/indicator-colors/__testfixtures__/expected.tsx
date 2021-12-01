// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Indicator } from '@toptal/picasso'

const defaultProps = {
  'data-testid': 'foo',
  className: 'bar',
  style: { position: 'absolute' }
}

export default () => (
  <>
    <Indicator {...defaultProps} color='red' />
    <Indicator {...defaultProps} color='blue' />
    <Indicator {...defaultProps} color='green' />
    <Indicator {...defaultProps} color='yellow' />
    <Indicator {...defaultProps} color='light-grey' />
    <Indicator {...defaultProps} />
  </>
)
