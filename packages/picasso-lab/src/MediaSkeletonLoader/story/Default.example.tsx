import React from 'react'
import { SkeletonLoader } from '@toptal/picasso-lab'
import { Container, Typography } from '@toptal/picasso'

const Example = () => (
  <>
    <Container bottom='medium'>
      <Container bottom='small'>
        <Typography variant='heading'>Variant: Avatar</Typography>
      </Container>

      <Container bottom='medium'>
        <Container bottom='xsmall'>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media size='xxsmall' />
          </Container>
          <Container inline left='small'>
            <SkeletonLoader.Media variant='avatar' size='xsmall' />
          </Container>
          <Container inline left='small'>
            <SkeletonLoader.Media variant='avatar' size='small' />
          </Container>
          <Container inline left='small'>
            <SkeletonLoader.Media variant='avatar' size='medium' />
          </Container>
          <Container inline left='small'>
            <SkeletonLoader.Media variant='avatar' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom='small'>
        <Typography variant='heading'>Variant: Icon</Typography>
      </Container>

      <Container bottom='medium'>
        <Container bottom='xsmall'>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='icon' size='medium' />
          </Container>
          <Container inline left='small'>
            <SkeletonLoader.Media variant='icon' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom='medium'>
        <Container bottom='xsmall'>
          <Typography>Shapes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='icon' size='large' circle />
          </Container>
          <Container inline left='small'>
            <SkeletonLoader.Media variant='icon' size='large' />
          </Container>
        </Container>
      </Container>

      <Container bottom='small'>
        <Typography variant='heading'>Variant: Image</Typography>
      </Container>

      <Container bottom='medium'>
        <Container bottom='xsmall'>
          <Typography>Sizes</Typography>
        </Container>
        <Container>
          <Container inline>
            <SkeletonLoader.Media variant='image' width='2rem' height='2rem' />
          </Container>
          <Container inline left='small'>
            <SkeletonLoader.Media variant='image' width='4rem' height='4rem' />
          </Container>
        </Container>
      </Container>

      <Container bottom='medium'>
        <Container bottom='xsmall'>
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
          <Container inline left='small'>
            <SkeletonLoader.Media variant='image' width='2rem' height='2rem' />
          </Container>
        </Container>
      </Container>
    </Container>
  </>
)

export default Example
