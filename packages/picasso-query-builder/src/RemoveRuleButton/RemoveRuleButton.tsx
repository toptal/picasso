import React from 'react'
import type { ActionWithRulesProps } from 'react-querybuilder'
import { Button, Trash16 } from '@toptal/picasso'

export const RemoveRuleButton = ({
  handleOnClick,
  className,
  disabled,
}: ActionWithRulesProps) => {
  return (
    <Button.Circular
      variant='flat'
      icon={<Trash16 />}
      onClick={handleOnClick}
      className={className}
      disabled={disabled}
    />
  )
}
