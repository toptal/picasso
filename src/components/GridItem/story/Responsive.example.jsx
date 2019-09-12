import React from 'react'
import { Grid, Container, Typography } from '@toptal/picasso'
import { palette, useScreen, useScreenSize } from '@toptal/picasso/utils'

const ScreenSize = ({ size }) => {
  const isExtraLarge = useScreen('extra-large')
  const isLarge = useScreen('large')
  const isMedium = useScreen('medium')

  if (isExtraLarge) {
    return `Extra Large - current [${size}px]`
  }
  if (isLarge) {
    return `Large - current [${size}px]`
  }
  if (isMedium) {
    return `Medium - current [${size}px]`
  }

  return `Small - current [${size}px]`
}

const ContentContainer = ({ children }) => (
  <Container padded='small' style={{ backgroundColor: palette.blue.lighter }}>
    <Typography variant='heading' size='small' align='center'>
      {children}
    </Typography>
  </Container>
)

const GridDefaultExample = () => {
  const windowSize = useScreenSize()

  return (
    <Grid>
      <Grid.Item small={12} medium={6} large={3}>
        <ContentContainer>
          <ScreenSize size={windowSize} />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item small={12} medium={6} large={3}>
        <ContentContainer>
          <ScreenSize size={windowSize} />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item small={12} medium={6} large={3}>
        <ContentContainer>
          <ScreenSize size={windowSize} />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item small={12} medium={6} large={3}>
        <ContentContainer>
          <ScreenSize size={windowSize} />
        </ContentContainer>
      </Grid.Item>
    </Grid>
  )
}

export default GridDefaultExample
