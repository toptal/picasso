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
    <Indicator {...defaultProps} color='negative' />
    <Indicator {...defaultProps} color='primary' />
    <Indicator {...defaultProps} color='positive' />
    <Indicator {...defaultProps} color='warning' />
    <Indicator {...defaultProps} color='light' />
    <Indicator {...defaultProps} />
  </>
)
