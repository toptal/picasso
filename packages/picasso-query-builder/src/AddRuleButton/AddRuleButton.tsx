import React from 'react'
import type { ActionWithRulesProps } from 'react-querybuilder'
import { Button } from '@toptal/picasso'
import type { MouseEvent } from 'react'

export const AddRuleButton = ({
  handleOnClick,
  className,
  disabled,
  context: { resetSubmitButtonClicked, testIds },
}: ActionWithRulesProps) => {
  return (
    <Button
      disabled={disabled}
      size='small'
      onClick={(e: MouseEvent) => {
        resetSubmitButtonClicked?.()
        handleOnClick(e)
      }}
      className={className}
      data-testid={testIds?.addRuleButton}
    >
      Add Rule
    </Button>
  )
}
