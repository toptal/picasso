import React from 'react'
import { Button, Container, PromptModal } from '@toptal/picasso'
import { useModal } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const PromptModalDefaultExample = () => {
  const {
    showModal: showModalPositive,
    hideModal: hideModalPositive,
    isOpen: isOpenPositive,
  } = useModal()

  const {
    showModal: showModalNegative,
    hideModal: hideModalNegative,
    isOpen: isOpenNegative,
  } = useModal()

  const {
    showModal: showModalPrimary,
    hideModal: hideModalPrimary,
    isOpen: isOpenPrimary,
  } = useModal()

  const { showInfo } = useNotifications()

  return (
    <>
      <Container flex>
        <Button onClick={showModalPositive}>Open positive</Button>
        <PromptModal
          variant='positive'
          open={isOpenPositive}
          title='Positive variant'
          message='This is positive variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalPositive}
        />

        <Button onClick={showModalNegative}>Open negative</Button>
        <PromptModal
          variant='negative'
          open={isOpenNegative}
          title='Negative variant'
          message='This is negative variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalNegative}
        />

        <Button onClick={showModalPrimary}>Open primary</Button>
        <PromptModal
          variant='primary'
          open={isOpenPrimary}
          title='Primary variant'
          message='This is primary variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalPrimary}
        />
      </Container>
    </>
  )
}

export default PromptModalDefaultExample
