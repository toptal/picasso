import React from 'react'
import { Button, Link } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const ButtonAugmentationExample = () => (
  <div>
    <Button as={Link} href='/#home'>
      Link
    </Button>

    <Button as={Link} href='/#home' icon={<Settings16 />}>
      Link
    </Button>

    <Button as={Link} href='/#home' variant='secondary'>
      Link
    </Button>

    <Button as={Link} href='/#home' disabled>
      Link
    </Button>

    <Button as={Link} href='/#home' loading>
      Link
    </Button>
  </div>
)

export default ButtonAugmentationExample
