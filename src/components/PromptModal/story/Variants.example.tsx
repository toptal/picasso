import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useModals } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const { showPrompt } = useModals()

  const handleDefaultClick = async () => {
    const result = await showPrompt(
      'Default variant',
      'This is default variant.',
      {
        // for purpose of code example
        container: () => document.getElementById('modal-container')!
      }
    )

    window.alert(result)
  }

  const handleRedClick = async () => {
    const result = await showPrompt('Red variant', 'This is red variant.', {
      variant: 'red',
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

    window.alert(result)
  }

  const handleBlueClick = async () => {
    const result = await showPrompt('Red variant', 'This is blue variant.', {
      variant: 'blue',
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

    window.alert(result)
  }

  const handleGreenClick = async () => {
    const result = await showPrompt('Red variant', 'This is blue variant.', {
      variant: 'green',
      // for purpose of code example
      container: () => document.getElementById('modal-container')!
    })

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
