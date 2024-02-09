import React from 'react'
import { Button, PromptModal } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const timeout = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo } = useNotifications()

  return (
    <>
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
      />
    </>
  )
}

export default PromptModalDefaultExample
