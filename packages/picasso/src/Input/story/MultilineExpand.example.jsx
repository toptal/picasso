import React from 'react'
import { Input, Container, Typography } from '@toptal/picasso'

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          With auto-expand (up to 5 rows)
        </Typography>
        <Container right='small'>
          <Input
            multiline
            rows={2}
            rowsMax={5}
            placeholder='With auto-expand...'
          />
        </Container>
      </Container>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          With auto-expand (up to 5 rows) and manual resize
        </Typography>
        <Container right='small'>
          <Input
            multiline
            multilineResizable
            rows={2}
            rowsMax={5}
            placeholder='With auto-expand and manual resize...'
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
