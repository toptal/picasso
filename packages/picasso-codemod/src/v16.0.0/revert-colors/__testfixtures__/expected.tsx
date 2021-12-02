// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Tag, Indicator, Container, Typography } from '@toptal/picasso'

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
    <Indicator {...defaultProps} color='red' />
    <Indicator {...defaultProps} color='blue' />
    <Indicator {...defaultProps} color='green' />
    <Indicator {...defaultProps} color='yellow' />
    <Indicator {...defaultProps} color='light-grey' />
    <Indicator {...defaultProps} />
    <Tag {...defaultProps} variant='red'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='blue'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='green'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='yellow'>
      Label
    </Tag>
    <Tag {...defaultProps} variant='light-grey'>
      Label
    </Tag>
    <Tag {...defaultProps}>Label</Tag>
    <Container>
      <Typography color='yellow'>Foobar</Typography>
    </Container>
  </>
)
