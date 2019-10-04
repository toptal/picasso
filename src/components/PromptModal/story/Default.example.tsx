import React, { useEffect } from 'react'
import { Button } from '@toptal/picasso'
import { useModals } from '@toptal/picasso/utils'

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()

  const handleClick = async () => {
    const result = await showPrompt('Confirm', 'Hello, World!', {
      submitText: 'OK',
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

    await timeout(3000)

    // @ts-ignore
    result.close()
  }

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Button onClick={handleClick}>Open prompt</Button>
    </div>
  )
}

export default PromptModalDefaultExample
