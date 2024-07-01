import React from 'react'
import { TypographyOverflow, Container, Grid } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <Container style={{ padding: 50, width: 900 }}>
    <Container>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='top-start'>
            top-start. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='top'>
            top. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='top-end'>
            top-end. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='left-start'>
            left-start. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <TypographyOverflow placement='right-start'>
            right-start. This typography is very long and therefore it
            overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='left'>
            left. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <TypographyOverflow placement='right'>
            right. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='left-end'>
            left-end. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4} />
        <Grid.Item sm={4}>
          <TypographyOverflow placement='right-end'>
            right-end. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
    <Container bottom={SPACING_4}>
      <Grid direction='row'>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='bottom-start'>
            bottom-start. This typography is very long and therefore it
            overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='bottom'>
            bottom. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
        <Grid.Item sm={4}>
          <TypographyOverflow placement='bottom-end'>
            bottom-end. This typography is very long and therefore it overflows.
          </TypographyOverflow>
        </Grid.Item>
      </Grid>
    </Container>
  </Container>
)

export default Example
