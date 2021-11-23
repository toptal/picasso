import React, { MouseEvent } from 'react'
import { Link, Container, Typography } from '@toptal/picasso'

const FontSizeExample = () => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    window.alert('Click handled just before redirect')
  }

  return (
    <div>
      <Container inline right='large'>
        <Typography>
          Please{' '}
          <Link onClick={handleClick} href='https://toptal.com'>
            verify
          </Link>{' '}
          your email
        </Typography>
      </Container>
      <Container inline right='large'>
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
