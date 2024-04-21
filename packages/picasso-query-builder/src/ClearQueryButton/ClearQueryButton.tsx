import React from 'react'
import { Button } from '@toptal/picasso-button'

type Props = {
  onClick: () => void
}

export const ClearQueryButton = ({ onClick }: Props) => {
  return (
    <Button variant='secondary' onClick={onClick}>
      Clear Query
    </Button>
  )
}
