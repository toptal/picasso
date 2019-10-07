import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useModals } from '@toptal/picasso/lab/utils'

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()
  const { showInfo } = useNotifications()

  const handleDefaultClick = async () => {
    const { result, hide } = await showPrompt(
      'Default variant',
      'This is default variant.',
      {
        // for purpose of code example
        container: () => document.getElementById('modal-container')!
      }
    )

    hide()
    showInfo(String(result))
  }

  const handleRedClick = async () => {
    const { result, hide } = await showPrompt(
      'Red variant',
      'This is red variant.',
      {
        variant: 'red',
        // for purpose of code example
        container: () => document.getElementById('modal-container')!
      }
    )

    hide()
    showInfo(String(result))
  }

  const handleBlueClick = async () => {
    const { result, hide } = await showPrompt(
      'Blue variant',
      'This is blue variant.',
      {
        variant: 'blue',
        // for purpose of code example
        container: () => document.getElementById('modal-container')!
      }
    )

    hide()
    showInfo(String(result))
  }

  const handleGreenClick = async () => {
    const { result, hide } = await showPrompt(
      'Green variant',
      'This is green variant.',
      {
        variant: 'green',
        // for purpose of code example
        container: () => document.getElementById('modal-container')!
      }
    )

    hide()
    window.alert(result)
  }

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
