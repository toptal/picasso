import React from 'react'
import type { ActionWithRulesAndAddersProps } from 'react-querybuilder'
import { Button } from '@toptal/picasso'
import type { MouseEvent } from 'react'

export type Props = Omit<ActionWithRulesAndAddersProps, 'schema'>

export const AddGroupButton = ({
  handleOnClick,
  className,
  disabled,
  context,
  level,
}: Props) => {
  const { maxDepth, resetSubmitButtonClicked, testIds } = context || {}

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
      data-testid={testIds?.addGroupButton}
    >
      Add Group
    </Button>
  )
}
