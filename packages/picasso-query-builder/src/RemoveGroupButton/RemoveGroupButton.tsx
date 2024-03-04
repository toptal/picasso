import React from 'react'
import type { ActionWithRulesProps } from 'react-querybuilder'
import { Button, PromptModal } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'

export const RemoveGroupButton = ({
  className,
  disabled,
  context: { removeGroup } = {},
  path,
}: ActionWithRulesProps) => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button
        size='small'
        variant='negative'
        onClick={showModal}
        className={className}
        disabled={disabled}
      >
        Remove
      </Button>
      <PromptModal
        open={isOpen}
        title='Remove Group'
        message='Are you sure you want to remove this group?'
        submitText='Confirm'
        variant='negative'
        onSubmit={() => removeGroup?.(path)}
        onClose={hideModal}
      />
    </>
  )
}
