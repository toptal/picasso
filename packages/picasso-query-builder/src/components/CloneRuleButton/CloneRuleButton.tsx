import React from 'react'
import type { ActionWithRulesProps } from 'react-querybuilder'
import { Button, Copy16 } from '@toptal/picasso'

export const CloneRuleButton = ({
  handleOnClick,
  className,
  disabled,
}: ActionWithRulesProps) => {
  return (
    <Button.Circular
      variant='flat'
      icon={<Copy16 />}
      onClick={handleOnClick}
      className={className}
      disabled={disabled}
    />
  )
}
