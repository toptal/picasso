import React from 'react'
import { Button, PromptModal } from '@toptal/picasso'
import { useNotifications, useModal } from '@toptal/picasso/utils'

const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo } = useNotifications()

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Button onClick={showModal}>Open prompt</Button>
      <PromptModal
        open={isOpen}
        title='Confirm'
        message='Hello, World!'
        submitText='OK'
        onSubmit={async () => {
          showInfo('Submitting')
          await timeout(2000)
          showInfo('Submitted')
        }}
        onClose={hideModal}
        // for purpose of code example
        container={() => document.getElementById('modal-container')!}
      />
    </div>
  )
}

export default PromptModalDefaultExample
