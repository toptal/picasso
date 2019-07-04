import React from 'react'
import { HelpBox, Container, Typography } from '@toptal/picasso'

const HelpBoxDefaultExample = () => (
  <div>
    <HelpBox />
    <Container bordered variant='green' padded='large'>
      <Container bottom='medium'>
        <Typography variant='heading' size='small'>
          Heading Small
        </Typography>
      </Container>
      <Typography variant='body' size='medium' color='grey'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </Container>
  </div>
)

export default HelpBoxDefaultExample
