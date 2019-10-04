import React from 'react'
import { Button } from '@toptal/picasso'
import { useModals, useNotifications } from '@toptal/picasso/utils'

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()

  const handleClick = async () => {
    const { result, hide } = await showPrompt('Confirm', 'Hello, World!', {
      submitText: 'OK',
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

    // for example if result is true we need to do some async operation
    if (result) {
      await timeout(2000)
    }

    hide()
    showInfo(String(result))
  }

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Button onClick={handleClick}>Open prompt</Button>
    </div>
  )
}

export default PromptModalDefaultExample
