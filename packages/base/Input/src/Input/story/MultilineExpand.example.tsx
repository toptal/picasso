import React from 'react'
import { Input, Container, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          With auto-expand (up to 5 rows)
        </Typography>
        <Container right={SPACING_4}>
          <Input
            multiline
            rows={2}
            rowsMax={5}
            placeholder='With auto-expand...'
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography variant='heading' size='small'>
          With auto-expand (up to 5 rows) and manual resize (not limited)
        </Typography>
        <Container right={SPACING_4}>
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
