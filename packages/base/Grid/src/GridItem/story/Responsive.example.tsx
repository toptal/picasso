import React from 'react'
import { Grid, Container, Typography } from '@toptal/picasso'
import { SPACING_4, palette, useBreakpoint } from '@toptal/picasso-utils'

const ScreenSize = () => {
  const isExtraLarge = useBreakpoint('xl')
  const isLarge = useBreakpoint('lg')
  const isMedium = useBreakpoint('md')

  if (isExtraLarge) {
    return <>Extra Large</>
  }
  if (isLarge) {
    return <>Large</>
  }
  if (isMedium) {
    return <>Medium</>
  }

  return <>Small</>
}

type Props = { children: React.ReactNode }

const ContentContainer = ({ children }: Props) => (
  <Container
    padded={SPACING_4}
    style={{ backgroundColor: palette.blue.lighter }}
  >
    <Typography variant='heading' size='small' align='center'>
      {children}
    </Typography>
  </Container>
)

const Example = () => {
  return (
    <Grid>
      <Grid.Item sm={12} md={6} lg={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item sm={12} md={6} lg={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item sm={12} md={6} lg={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item sm={12} md={6} lg={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
    </Grid>
  )
}

export default Example
