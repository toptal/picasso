import React from 'react'
import { breakpoints } from '@toptal/picasso/utils'
import { Grid, Paper, Image, Typography, Container } from '@toptal/picasso'

const breakpointsList = Object.entries(breakpoints)

const Example = () => (
  <Grid spacing={16}>
    {breakpointsList.map(([breakpointName, breakpointValue], index) => {
      const prevBreakpoint = breakpointsList[index - 1]
      let prevBreakpointValue

      if (prevBreakpoint) {
        prevBreakpointValue = prevBreakpoint[1]
      }

      const isSmallestBreakpoint = index === 0
      const isLargestBreakpoint = index === breakpointsList.length - 1

      return (
        <Grid.Item key={breakpointName} medium={3}>
          <Paper style={{ padding: '2rem' }}>
            <Container flex direction='column' alignItems='center'>
              <Typography variant='heading' size='large'>
                {breakpointName}
              </Typography>
              <Typography size='xsmall'>
                {isSmallestBreakpoint && `< ${breakpointValue} px`}
                {isLargestBreakpoint && `> ${prevBreakpointValue} px`}
                {!isSmallestBreakpoint &&
                  !isLargestBreakpoint &&
                  `${prevBreakpointValue} px < ... < ${breakpointValue} px`}
              </Typography>
              <Container top={1}>
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
