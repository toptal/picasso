import React from 'react'
import { Button, Container, PromptModal } from '@toptal/picasso'
import { useNotifications, useModal } from '@toptal/picasso/utils'

const PromptModalDefaultExample = () => {
  const {
    showModal: showModalDefault,
    hideModal: hideModalDefault,
    isOpen: isOpenDefault
  } = useModal()
  const {
    showModal: showModalRed,
    hideModal: hideModalRed,
    isOpen: isOpenRed
  } = useModal()
  const {
    showModal: showModalBlue,
    hideModal: hideModalBlue,
    isOpen: isOpenBlue
  } = useModal()
  const {
    showModal: showModalGreen,
    hideModal: hideModalGreen,
    isOpen: isOpenGreen
  } = useModal()
  const { showInfo } = useNotifications()

  return (
    <div id='modal-container' style={{ width: '400px', height: '50px' }}>
      <Container flex>
        <Button onClick={showModalDefault}>Open default prompt</Button>
        <PromptModal
          open={isOpenDefault}
          title='Default variant'
          message='This is default variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalDefault}
          // for purpose of code example
          container={() => document.getElementById('modal-container')!}
        />

        <Button onClick={showModalRed}>Open red prompt</Button>
        <PromptModal
          variant='red'
          open={isOpenRed}
          title='Red variant'
          message='This is red variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalRed}
          // for purpose of code example
          container={() => document.getElementById('modal-container')!}
        />

        <Button onClick={showModalBlue}>Open blue prompt</Button>
        <PromptModal
          variant='blue'
          open={isOpenBlue}
          title='Blue variant'
          message='This is blue variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalBlue}
          // for purpose of code example
          container={() => document.getElementById('modal-container')!}
        />

        <Button onClick={showModalGreen}>Open green prompt</Button>
        <PromptModal
          variant='green'
          open={isOpenGreen}
          title='Green variant'
          message='This is green variant.'
          onSubmit={async () => showInfo('Submitted')}
          onClose={hideModalGreen}
          // for purpose of code example
          container={() => document.getElementById('modal-container')!}
        />
      </Container>
    </div>
  )
}

export default PromptModalDefaultExample
