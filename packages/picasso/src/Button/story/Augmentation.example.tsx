import React from 'react'
import { Button, Link, LinkProps } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

const ActionLink = (props: LinkProps): React.ReactNode => (
  <Link {...props} variant='action' />
)

const ButtonAugmentationExample = () => (
  <div>
    <Button as={ActionLink} href='/#home'>
      Link
    </Button>

    <Button as={ActionLink} href='/#home' icon={<Settings16 />}>
      Link
    </Button>

    <Button as={ActionLink} href='/#home' variant='secondary'>
      Link
    </Button>

    <Button as={ActionLink} href='/#home' disabled>
      Link
    </Button>

    <Button as={ActionLink} href='/#home' loading>
      Link
    </Button>
  </div>
)

export default ButtonAugmentationExample
