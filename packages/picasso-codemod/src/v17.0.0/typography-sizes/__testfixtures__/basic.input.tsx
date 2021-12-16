// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Amount, Typography } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const test = 'small'

export default () => (
  <>
    <Typography size>Text</Typography>
    <Typography size='small'>Text</Typography>
    <Typography size='small' variant='body'>
      Text
    </Typography>
    <Typography size='xsmall' color='white'>
      Text
    </Typography>
    <Typography size='xxsmall'>Text</Typography>
    <Typography size={test ? 'small' : 'xsmall'}>Text</Typography>
    <Typography size='small' variant='heading'>
      Text
    </Typography>
    <Typography size={test}>Text</Typography>
    <Typography size={test} variant={test}>
      Text
    </Typography>
    <TypographyOverflow size={test ? 'medium' : 'small'}>
      Overflowed text
    </TypographyOverflow>
    <TypographyOverflow size='small' variant='heading'>
      Overflowed text
    </TypographyOverflow>
    <TypographyOverflow size='large'>Overflowed text</TypographyOverflow>
    <TypographyOverflow size='xsmall' variant='body'>
      Overflowed text
    </TypographyOverflow>
    <Amount size='small'>Amount</Amount>
  </>
)
