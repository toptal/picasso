import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useModals } from '@toptal/picasso-lab/utils'

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()

  const handleDefaultClick = () =>
    showPrompt({
      title: 'Default variant',
      message: 'This is default variant.',
      onSubmit: async () => showInfo('Submitted'),
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

  const handleRedClick = () =>
    showPrompt({
      title: 'Red variant',
      message: 'This is red variant.',
      variant: 'red',
      onSubmit: async () => showInfo('Submitted'),
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

  const handleBlueClick = () =>
    showPrompt({
      title: 'Blue variant',
      message: 'This is blue variant.',
      variant: 'blue',
      onSubmit: async () => showInfo('Submitted'),
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

  const handleGreenClick = () =>
    showPrompt({
      title: 'Green variant',
      message: 'This is green variant.',
      variant: 'green',
      onSubmit: () => showInfo('Submitted'),
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Container flex>
        <Button onClick={() => handleDefaultClick()}>
          Open default prompt
        </Button>
        <Button onClick={() => handleRedClick()}>Open red prompt</Button>
        <Button onClick={() => handleBlueClick()}>Open blue prompt</Button>
        <Button onClick={() => handleGreenClick()}>Open green prompt</Button>
      </Container>
    </div>
  )
}

export default PromptModalDefaultExample
