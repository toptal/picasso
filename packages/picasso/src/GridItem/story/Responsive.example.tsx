import React from 'react'
import { Grid, Container, Typography } from '@toptal/picasso'
import { palette, useBreakpoint } from '@toptal/picasso/utils'

const ScreenSize = () => {
  const isExtraLarge = useBreakpoint('extra-large')
  const isLarge = useBreakpoint('large')
  const isMedium = useBreakpoint('medium')

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
  <Container padded='small' style={{ backgroundColor: palette.blue.lighter }}>
    <Typography variant='heading' size='small' align='center'>
      {children}
    </Typography>
  </Container>
)

const Example = () => {
  return (
    <Grid>
      <Grid.Item small={12} medium={6} large={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item small={12} medium={6} large={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item small={12} medium={6} large={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
      <Grid.Item small={12} medium={6} large={3}>
        <ContentContainer>
          <ScreenSize />
        </ContentContainer>
      </Grid.Item>
    </Grid>
  )
}

export default Example
