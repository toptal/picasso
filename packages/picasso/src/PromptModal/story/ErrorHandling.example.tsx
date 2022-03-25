import React from 'react'
import { Button, Input, PromptModal } from '@toptal/picasso'
import { useNotifications, useModal } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showInfo, showError } = useNotifications()

  return (
    <>
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
              status={error ? 'error' : 'default'}
              value={String(result || '')}
              onChange={handleChange}
            />
          )
        }}
      </PromptModal>
    </>
  )
}

export default PromptModalDefaultExample
