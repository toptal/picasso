import React from 'react'
import { Button, Input } from '@toptal/picasso'
import { useModals, useNotifications } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()

  const handleClick = async () => {
    const { result, hide } = await showPrompt('Email', 'Enter your email:', {
      // eslint-disable-next-line react/display-name
      children: ({ setResult, result }) => (
        <Input
          width='full'
          onChange={event => setResult(event.target.value)}
          value={result}
        />
      ),
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

    hide()
    showInfo(String(result))
  }

  return (
    <React.Fragment>
      <div id='modal-container' style={{ width: '400px', height: '50px' }}>
        <Button onClick={handleClick}>Open prompt</Button>
      </div>
    </React.Fragment>
  )
}

export default PromptModalDefaultExample
