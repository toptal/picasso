import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import { SPACING_4, palette } from '@toptal/picasso-utils'

type Props = {
  backgroundColor: string
}

const LoaderContent = ({ backgroundColor }: Props) => (
  <Container style={{ backgroundColor, maxWidth: '32%' }} padded={SPACING_4}>
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      bottom={SPACING_4}
    >
      <SkeletonLoader.Header />
      <SkeletonLoader.Button />
    </Container>

    <Container bottom={SPACING_4}>
      <SkeletonLoader.Typography rows={2} />
    </Container>

    <Grid>
      <Grid.Item sm={6}>
        <SkeletonLoader.Media variant='image' width='5rem' height='5rem' />
      </Grid.Item>

      <Grid.Item sm={6}>
        <Container flex justifyContent='center' bottom={SPACING_4}>
          <SkeletonLoader.Header />
        </Container>
        <SkeletonLoader.Typography rows={2} />
      </Grid.Item>
    </Grid>
  </Container>
)

const BackgroundExample = () => (
  <Grid>
    <LoaderContent backgroundColor={palette.grey.dark} />
    <LoaderContent backgroundColor={palette.blue.darker} />
    <LoaderContent backgroundColor={palette.grey.darker} />
  </Grid>
)

export default BackgroundExample
