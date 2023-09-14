import React from 'react'
import type { ActionWithRulesProps } from 'react-querybuilder'
import { Button } from '@toptal/picasso'
import type { MouseEvent } from 'react'

export const AddRuleButton = ({
  handleOnClick,
  className,
  disabled,
  context: { resetSubmitButtonClicked },
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
      data-testid='query-builder-add-rule-button'
    >
      Add Rule
    </Button>
  )
}
