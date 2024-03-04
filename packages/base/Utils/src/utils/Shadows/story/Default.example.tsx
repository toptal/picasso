import type { ReactNode } from 'react'
import React from 'react'
import { shadows, SPACING_6, SPACING_8, SPACING_4 } from '@toptal/picasso-utils'
import { Container, Typography, Grid } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='column' gap={SPACING_6} top={SPACING_8}>
    <Grid spacing={80}>
      <ShadowBox shadow={shadows[0]} index={0} description={'none'} />
      <ShadowBox
        shadow={shadows[1]}
        index={1}
        description={'notification center, paper'}
      />
      <ShadowBox shadow={shadows[2]} index={2} description={'modal'} />
      <ShadowBox
        shadow={shadows[3]}
        index={3}
        description={'notification growl'}
      />
      <ShadowBox shadow={shadows[4]} index={4} description={'tooltip'} />
      <ShadowBox shadow={shadows[5]} index={5} description={'scroll menu'} />
    </Grid>
  </Container>
)

interface ShadowBoxProps {
  shadow: string
  index: number
  description?: ReactNode
}
const ShadowBox = ({ index, shadow, description }: ShadowBoxProps) => (
  <Grid.Item sm={4}>
    <Container padded={SPACING_4} style={{ boxShadow: shadow }}>
      <Typography variant='heading' size='large' align='center'>
        {index}
      </Typography>
      <Typography size='xsmall' align='center'>
        {description}
      </Typography>
    </Container>
  </Grid.Item>
)

export default Example
