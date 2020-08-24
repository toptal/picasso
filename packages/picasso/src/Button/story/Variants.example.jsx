import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { palette } from '@toptal/picasso/utils'
import {
  Copy24,
  Twitter24,
  Linkedin24,
  ReferralBonus24
} from '@toptal/picasso/Icon'

const Example = () => (
  <div>
    <Typography variant='heading' size='small'>
      Primary:
    </Typography>
    <Container top='small' bottom='large'>
      <Button>Primary Blue</Button>
      <Button variant='primary-red'>Primary Red</Button>
      <Button variant='primary-green'>Primary Green</Button>
    </Container>

    <Typography variant='heading' size='small'>
      Secondary:
    </Typography>
    <Container top='small' bottom='large'>
      <Button variant='secondary-blue'>Secondary Blue</Button>
      <Button variant='secondary-red'>Secondary Red</Button>
      <Button variant='secondary-green'>Secondary Green</Button>
      <Container
        left={0.5}
        padded={0.5}
        inline
        style={{ backgroundColor: palette.blue.main }}
      >
        <Button variant='secondary-white'>Secondary White</Button>
      </Container>
    </Container>

    <Typography variant='heading' size='small'>
      Flat:
    </Typography>

    <Container top='small' bottom='large'>
      <Button variant='flat'>Flat</Button>
      <Container
        left={0.5}
        padded={0.5}
        inline
        style={{ backgroundColor: palette.blue.main }}
      >
        <Button variant='flat-white'>Flat White</Button>
      </Container>
    </Container>

    <Typography variant='heading' size='small'>
      Transparent:
    </Typography>

    <Container top='small'>
      <Button variant='transparent' icon={<Copy24 />} />
      <Container
        left={0.5}
        padded={0.5}
        inline
        style={{ backgroundColor: palette.blue.main }}
      >
        <Button variant='transparent-white' icon={<Twitter24 />} />
      </Container>
      <Container left={0.5} padded={0.5} inline>
        <Button variant='transparent-blue' icon={<Linkedin24 />} />
      </Container>
      <Container left={0.5} padded={0.5} inline>
        <Button variant='transparent-green' icon={<ReferralBonus24 />} />
      </Container>
    </Container>
  </div>
)

export default Example
