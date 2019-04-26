import React from 'react'
import {
  breakpoints,
  Grid,
  Paper,
  Image,
  Typography,
  Container
} from '@toptal/picasso'

const breakpointsList = Object.entries(breakpoints)

const BreakpointsExample = () => (
  <Grid spacing={16}>
    {breakpointsList.map(([breakpointName, breakpointValue], index) => {
      const nextBreakpoint = breakpointsList[index + 1]
      let nextBreakpointValue

      if (nextBreakpoint) {
        nextBreakpointValue = nextBreakpoint[1]
      }

      const isSmallestBreakpoint = index === 0
      const isLargestBreakpoint = index === breakpointsList.length - 1

      return (
        <Grid.Item key={breakpointName} medium={3}>
          <Paper style={{ padding: '2em' }}>
            <Container flex direction='column' alignItems='center'>
              <Typography variant='h2' weight='light'>
                {breakpointName}
              </Typography>
              <Typography variant='caption'>
                {isSmallestBreakpoint && `< ${nextBreakpointValue} px`}
                {isLargestBreakpoint && `> ${breakpointValue} px`}
                {!isSmallestBreakpoint &&
                  !isLargestBreakpoint &&
                  `${breakpointValue} px < ... < ${nextBreakpointValue} px`}
              </Typography>
              <Container top={1}>
                <Image
                  src={`./ico-breakpoint-${breakpointName}.svg`}
                  alt={`${breakpointName}`}
                  style={{ height: '7em' }}
                />
              </Container>
            </Container>
          </Paper>
        </Grid.Item>
      )
    })}
  </Grid>
)

export default BreakpointsExample
