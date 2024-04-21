import React from 'react'
import type { ActionWithRulesProps } from 'react-querybuilder'
import { ButtonCircular } from '@toptal/picasso-button'
import { Copy16 } from '@toptal/picasso-icons'

export const CloneRuleButton = ({
  handleOnClick,
  className,
  disabled,
}: ActionWithRulesProps) => {
  return (
    <ButtonCircular
      variant='flat'
      icon={<Copy16 />}
      onClick={handleOnClick}
      className={className}
      disabled={disabled}
    />
  )
}
