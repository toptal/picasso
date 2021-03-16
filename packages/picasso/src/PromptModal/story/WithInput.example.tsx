import React from 'react'
import { Button, Input, PromptModal } from '@toptal/picasso'
import { useNotifications, useModal } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo } = useNotifications()

  return (
    <>
      <Button onClick={showModal}>Open prompt</Button>
      <PromptModal
        open={isOpen}
        onClose={hideModal}
        title='Email'
        message='Enter your email:'
        onSubmit={result => showInfo(String(result))}
      >
        {({ setResult, result }) => (
          <Input
            width='full'
            onChange={event => setResult(event.target.value)}
            value={String(result || '')}
          />
        )}
      </PromptModal>
    </>
  )
}

export default PromptModalDefaultExample
