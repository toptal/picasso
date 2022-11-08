import React, { ReactNode } from 'react'
import { shadows } from '@toptal/picasso/utils'
import { Container, Typography, Grid } from '@toptal/picasso'

const Example = () => (
  <Container flex direction='column' gap='medium'>
    <Typography>
      First 6 shadows are overriden by BASE values. Following shadow values are
      coming from MUI.
    </Typography>
    <Grid spacing={80}>
      <ShadowBox
        shadow={shadows[0]}
        index={0}
        description={
          <Typography size='xsmall' align='center'>
            none
          </Typography>
        }
      />
      <ShadowBox
        shadow={shadows[1]}
        index={1}
        description={
          <Typography size='xsmall' align='center'>
            notification center, paper
          </Typography>
        }
      />
      <ShadowBox
        shadow={shadows[2]}
        index={2}
        description={
          <Typography size='xsmall' align='center'>
            modal
          </Typography>
        }
      />
      <ShadowBox
        shadow={shadows[3]}
        index={3}
        description={
          <Typography size='xsmall' align='center'>
            notification growl
          </Typography>
        }
      />
      <ShadowBox
        shadow={shadows[4]}
        index={4}
        description={
          <Typography size='xsmall' align='center'>
            tooltip
          </Typography>
        }
      />
      <ShadowBox
        shadow={shadows[5]}
        index={5}
        description={
          <Typography size='xsmall' align='center'>
            scroll menu
          </Typography>
        }
      />
      {shadows.slice(6).map((shadow, index) => (
        <ShadowBox
          key={shadow}
          shadow={shadow}
          index={index + 6}
          description={
            <>
              {shadow.split('),').map((color, colorIndex) => (
                <Typography key={color} size='xsmall' align='center'>
                  {color}
                  {colorIndex !== shadow.split('),').length - 1 ? ')' : ''}
                </Typography>
              ))}
            </>
          }
        />
      ))}
    </Grid>
  </Container>
)

interface ShadowBoxProps {
  shadow: string
  index: number
  description?: ReactNode
}
const ShadowBox = ({ index, shadow, description }: ShadowBoxProps) => (
  <Grid.Item small={3}>
    <Container padded='small' style={{ boxShadow: shadow }}>
      <Typography variant='heading' size='large' align='center'>
        {index}
      </Typography>
      {description}
    </Container>
  </Grid.Item>
)

export default Example
