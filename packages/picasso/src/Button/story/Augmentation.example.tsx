import React, { forwardRef } from 'react'
import { Button, Link, LinkProps } from '@toptal/picasso'
import { Settings16 } from '@toptal/picasso/Icon'

// variant & noUnderline are statically set in ActionLink
type ActionLinkProps = Omit<LinkProps, 'variant' | 'noUnderline'>

const ActionLink = forwardRef<HTMLAnchorElement, ActionLinkProps>(
  (props, ref) => <Link ref={ref} {...props} variant='action' noUnderline />
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
