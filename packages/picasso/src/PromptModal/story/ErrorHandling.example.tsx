import React from 'react'
import { Button, Input, PromptModal } from '@toptal/picasso'
import { useNotifications, useModal } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo, showError } = useNotifications()

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Button onClick={showModal}>Open prompt</Button>
      <PromptModal
        open={isOpen}
        title='Email'
        message='Enter your email:'
        onSubmit={result => {
          if (!result || result === '') {
            showError('Result cannot be empty')
            throw new Error('Result cannot be empty')
          }

          showInfo(String(result))
        }}
        onClose={hideModal}
        // for purpose of code example
        container={() => document.getElementById('modal-container')!}
      >
        {({ setResult, result, error, setError }) => {
          const handleChange = (
            event: React.ChangeEvent<
              HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
          ) => {
            const { value } = event.target

            if (!value) {
              setError(true)
            } else {
              setError(false)
            }

            setResult(value)
          }

          return (
            <Input
              width='full'
              error={error}
              value={String(result || '')}
              onChange={handleChange}
            />
          )
        }}
      </PromptModal>
    </div>
  )
}

export default PromptModalDefaultExample
