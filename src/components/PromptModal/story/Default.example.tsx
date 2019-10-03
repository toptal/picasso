import React, { useEffect } from 'react'
import { Button } from '@toptal/picasso'
import { useModals } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()

  const handleClick = async () => {
    const result = await showPrompt('Confirm', 'Hello, World!', {
      submitText: 'OK',
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

    window.alert(result)
  }

  // show a modal when the example is opened, in demonstration purpose
  useEffect(() => {
    handleClick()
  })

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Button onClick={handleClick}>Open prompt</Button>
    </div>
  )
}

export default PromptModalDefaultExample
