import React from 'react'
import type { ActionWithRulesProps } from 'react-querybuilder'
import { ButtonCircular } from '@toptal/picasso-button'
import { Trash16 } from '@toptal/picasso-icons'

export const RemoveRuleButton = ({
  handleOnClick,
  className,
  disabled,
  context: { testIds },
}: ActionWithRulesProps) => {
  return (
    <ButtonCircular
      variant='flat'
      icon={<Trash16 />}
      data-testid={testIds?.removeRuleButton}
      onClick={handleOnClick}
      className={className}
      disabled={disabled}
    />
  )
}
