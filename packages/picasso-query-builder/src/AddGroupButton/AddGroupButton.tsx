import React from 'react'
import type { ActionWithRulesAndAddersProps } from 'react-querybuilder'
import { Button } from '@toptal/picasso'
import type { MouseEvent } from 'react'

export interface Props extends Omit<ActionWithRulesAndAddersProps, 'schema'> {
  context?: {
    maxDepth: number
    resetSubmitButtonClicked?: () => void
  }
}

export const AddGroupButton = ({
  handleOnClick,
  className,
  disabled,
  context,
  level,
  testID,
}: Props) => {
  const { maxDepth, resetSubmitButtonClicked } = context || {}

  if (!maxDepth || level >= maxDepth) {
    return null
  }

  return (
    <Button
      size='small'
      variant='secondary'
      onClick={(e: MouseEvent) => {
        resetSubmitButtonClicked?.()
        handleOnClick(e)
      }}
      className={className}
      disabled={disabled}
      data-testid={testID}
    >
      Add Group
    </Button>
  )
}
