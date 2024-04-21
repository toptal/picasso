import React from 'react'
import type { ActionWithRulesProps } from 'react-querybuilder'
import { Button } from '@toptal/picasso-button'

export const CloneGroupButton = ({
  handleOnClick,
  className,
  disabled,
}: ActionWithRulesProps) => {
  return (
    <Button
      className={className}
      disabled={disabled}
      size='small'
      variant='secondary'
      onClick={handleOnClick}
    >
      Duplicate
    </Button>
  )
}
