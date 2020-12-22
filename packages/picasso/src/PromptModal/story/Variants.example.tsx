import React from 'react'
import { Button, Container, PromptModal } from '@toptal/picasso'
import { useNotifications, useModal } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const {
    showModal: showModalPositive,
    hideModal: hideModalPositive,
    isOpen: isOpenPositive
  } = useModal()

  const {
    showModal: showModalNegative,
    hideModal: hideModalNegative,
    isOpen: isOpenNegative
  } = useModal()

  const { showInfo } = useNotifications()

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Container flex>
        <Button onClick={showModalPositive}>Open positive</Button>
        <PromptModal
          variant='positive'
          open={isOpenPositive}
          title='Positive variant'
          message='This is positive variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalPositive}
          // for purpose of code example
          container={() => document.getElementById('modal-container')!}
        />

        <Button onClick={showModalNegative}>Open negative</Button>
        <PromptModal
          variant='negative'
          open={isOpenNegative}
          title='Negative variant'
          message='This is negative variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalNegative}
          // for purpose of code example
          container={() => document.getElementById('modal-container')!}
        />
      </Container>
    </div>
  )
}

export default PromptModalDefaultExample
