import React from 'react'
import { breakpoints, SPACING_4 } from '@toptal/picasso-utils'
import { Grid, Paper, Image, Typography, Container } from '@toptal/picasso'

const breakpointsList = Object.entries(breakpoints)

const Example = () => (
  <Grid justifyContent='center' spacing={16}>
    {breakpointsList.map(([breakpointName, breakpointValue], index) => {
      const nextBreakpoint = breakpointsList[index + 1]
      let nextBreakpointValue

      if (nextBreakpoint) {
        nextBreakpointValue = nextBreakpoint[1]
      }

      const isSmallestBreakpoint = index === 0
      const isLargestBreakpoint = index === breakpointsList.length - 1

      return (
        <Grid.Item key={breakpointName} md={2}>
          <Paper style={{ padding: '2rem' }}>
            <Container flex direction='column' alignItems='center'>
              <Typography variant='heading' size='large'>
                {breakpointName}
              </Typography>
              <Typography size='xsmall'>
                {isSmallestBreakpoint && `< ${nextBreakpointValue} px`}
                {isLargestBreakpoint && `≥ ${breakpointValue} px`}
                {!isSmallestBreakpoint &&
                  !isLargestBreakpoint &&
                  `${breakpointValue} px ≤ ... < ${nextBreakpointValue} px`}
              </Typography>
              <Container top={SPACING_4}>
                <Image
                  src={`./ico-breakpoint-${breakpointName}.svg`}
                  alt={`${breakpointName}`}
                  style={{ height: '7rem' }}
                />
              </Container>
            </Container>
          </Paper>
        </Grid.Item>
      )
    })}
  </Grid>
)

export default Example
