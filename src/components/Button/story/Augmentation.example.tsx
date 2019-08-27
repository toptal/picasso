import React from 'react'
import { Button, Link } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const ButtonAugmentationExample = () => (
  <div>
    {/*
        // @ts-ignore - until we fix as typings */}
    <Button as={Link} href='/#home'>
      Link
    </Button>
    {/*
      // @ts-ignore - until we fix as typings */}
    <Button as={Link} href='/#home' icon={<Settings16 />}>
      Link
    </Button>
    {/*
      // @ts-ignore - until we fix as typings */}
    <Button as={Link} href='/#home' variant='secondary-red'>
      Link
    </Button>
    {/*
      // @ts-ignore - until we fix as typings */}
    <Button as={Link} href='/#home' disabled>
      Link
    </Button>
    {/*
      // @ts-ignore - until we fix as typings */}
    <Button as={Link} href='/#home' loading>
      Link
    </Button>
  </div>
)

export default ButtonAugmentationExample
