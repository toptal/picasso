import React from 'react'
import { Button, Input, PromptModal } from '@toptal/picasso'
import { useNotifications, useModal } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo } = useNotifications()

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Button onClick={showModal}>Open prompt</Button>
      <PromptModal
        open={isOpen}
        onClose={hideModal}
        title='Email'
        message='Enter your email:'
        onSubmit={result => showInfo(String(result))}
        // for purpose of code example
        container={() => document.getElementById('modal-container')!}
      >
        {({ setResult, result }) => (
          <Input
            width='full'
            onChange={event => setResult(event.target.value)}
            value={String(result || '')}
          />
        )}
      </PromptModal>
    </div>
  )
}

export default PromptModalDefaultExample
