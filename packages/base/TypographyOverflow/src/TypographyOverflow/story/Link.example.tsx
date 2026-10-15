import React, { useState } from 'react'
import {
  Button,
  Container,
  Link,
  Typography,
  TypographyOverflow,
} from '@toptal/picasso'

const Example = () => {
  const [clicked, setClicked] = useState('nothing yet')

  return (
    <div style={{ width: 300, marginTop: 100 }}>
      <TypographyOverflow data-testid='ellipsed-text'>
        <Link href='#' onClick={() => setClicked('the link')}>
          Invoice
        </Link>{' '}
        a client whose name is long enough to overflow
      </TypographyOverflow>
      <Container top='small'>
        <TypographyOverflow>
          <Button size='small' onClick={() => setClicked('the button')}>
            Invoice
          </Button>{' '}
          a client whose name is long enough to overflow
        </TypographyOverflow>
      </Container>
      <Container top='small'>
        <Typography size='small'>Clicked: {clicked}</Typography>
      </Container>
    </div>
  )
}

export default Example
