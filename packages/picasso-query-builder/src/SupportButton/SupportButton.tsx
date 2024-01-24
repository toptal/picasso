import { Button, Help16, Link, Tooltip } from '@toptal/picasso'
import React from 'react'

export const SupportButton = ({
  'data-testid': dataTestId,
}: {
  'data-testid'?: string | undefined
}) => (
  <Tooltip content='Send feedback / Report bugs' placement='top'>
    <Link
      data-testid={dataTestId}
      target='_blank'
      href='https://support.toptal.net'
    >
      <Button.Circular variant='flat' icon={<Help16 />} />
    </Link>
  </Tooltip>
)
