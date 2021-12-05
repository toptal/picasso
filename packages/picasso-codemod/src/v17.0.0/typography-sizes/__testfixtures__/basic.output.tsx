// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { Typography } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const test = 'small'

export default () => (
  <>
    <Typography size>Text</Typography>
    <Typography size='xsmall'>Text</Typography>
    <Typography size='xsmall' variant='body'>
      Text
    </Typography>
    <Typography size='xxsmall' color='white'>
      Text
    </Typography>
    <Typography size='xxsmall'>Text</Typography>
    <Typography size={test ? 'xsmall' : 'xxsmall'}>Text</Typography>
    <Typography size='small' variant='heading'>
      Text
    </Typography>
    <Typography size={test}>Text</Typography>
    <Typography size={test} variant={test}>
      Text
    </Typography>
    <TypographyOverflow size={test ? 'medium' : 'xsmall'}>
      Overflowed text
    </TypographyOverflow>
    <TypographyOverflow size='small' variant='heading'>
      Overflowed text
    </TypographyOverflow>
    <TypographyOverflow size='large'>Overflowed text</TypographyOverflow>
    <TypographyOverflow size='xxsmall' variant='body'>
      Overflowed text
    </TypographyOverflow>
  </>
)
