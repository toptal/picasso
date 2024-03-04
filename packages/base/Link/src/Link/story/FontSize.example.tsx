import type { MouseEvent } from 'react'
import React from 'react'
import { Link, Container, Typography } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso-utils'

const FontSizeExample = () => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    window.alert('Click handled just before redirect')
  }

  return (
    <div>
      <Container inline right={SPACING_8}>
        <Typography>
          Please{' '}
          <Link onClick={handleClick} href='https://toptal.com'>
            verify
          </Link>{' '}
          your email
        </Typography>
      </Container>
      <Container inline right={SPACING_8}>
        <Typography variant='heading' size='large'>
          Please{' '}
          <Link onClick={handleClick} href='https://toptal.com'>
            verify
          </Link>{' '}
          your email
        </Typography>
      </Container>
    </div>
  )
}

export default FontSizeExample
