import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useModals } from '@toptal/picasso-lab/utils'

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()

  const handleClick = () =>
    showPrompt({
      title: 'Confirm',
      message: 'Hello, World!',
      submitText: 'OK',
      onSubmit: async () => {
        showInfo('Submitting')
        await timeout(2000)
        showInfo('Submitted')
      },
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Button onClick={handleClick}>Open prompt</Button>
    </div>
  )
}

export default PromptModalDefaultExample
