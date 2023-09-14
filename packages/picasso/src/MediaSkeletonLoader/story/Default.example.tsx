import React from 'react'
import { SkeletonLoader, Container, Typography } from '@toptal/picasso'
import { SPACING_6, SPACING_4, SPACING_2 } from '@toptal/picasso/utils'

const Example = () => (
  <>
    <Container bottom={SPACING_6}>
      <Container bottom={SPACING_4}>
        <Typography variant='heading'>Variant: Avatar</Typography>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media size='xxsmall' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='avatar' size='xsmall' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='avatar' size='small' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='avatar' size='medium' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='avatar' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom={SPACING_4}>
        <Typography variant='heading'>Variant: Icon</Typography>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='icon' size='medium' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='icon' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Shapes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='icon' size='large' circle />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='icon' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom={SPACING_4}>
        <Typography variant='heading'>Variant: Image</Typography>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='image' width='2rem' height='2rem' />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='image' width='4rem' height='4rem' />
          </Container>
        </Container>
      </Container>

      <Container bottom={SPACING_6}>
        <Container bottom={SPACING_2}>
          <Typography>Shapes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media
              variant='image'
              width='2rem'
              height='2rem'
              circle
            />
          </Container>
          <Container inline left={SPACING_4}>
            <SkeletonLoader.Media variant='image' width='2rem' height='2rem' />
          </Container>
        </Container>
      </Container>
    </Container>
  </>
)

export default Example
