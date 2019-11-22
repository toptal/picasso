import React from 'react'
import { Container, Label, Settings16, Typography } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'

const LabelVariantsExample = () => (
  <div>
    <Typography variant='heading' size='small'>
      Grey:
    </Typography>
    <Container top='small' bottom='large' padded='medium'>
      <Label icon={<Settings16 />} variant='grey'>
        Label
      </Label>
    </Container>

    <Typography variant='heading' size='small'>
      White:
    </Typography>
    <Container
      top='small'
      bottom='large'
      style={{ backgroundColor: palette.grey.dark }}
      padded='medium'
    >
      <Label icon={<Settings16 />} variant='white'>
        Label
      </Label>
    </Container>
  </div>
)

export default LabelVariantsExample
