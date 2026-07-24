import React, { useState } from 'react'
import { Button, Container, Modal, Popper, Typography } from '@toptal/picasso'
import { useModal, SPACING_4 } from '@toptal/picasso-utils'

const FILLER =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const ModalWithPopper = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const popperOpen = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(popperOpen ? null : event.currentTarget)
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Popper inside a scrollable Modal</Modal.Title>
      <Modal.Content>
        <div style={{ maxHeight: 300, overflowY: 'auto' }}>
          <Typography variant='heading' size='medium'>
            Scroll down to find the Toggle Popper button. With{' '}
            <code>disablePortal</code> the Popper renders inside the scrollable
            container, so floating-ui detects the scroll boundary and flips the
            Popper upward when there is no room below.
          </Typography>
          {Array.from({ length: 6 }, (_, index) => (
            <Container key={index} top={SPACING_4}>
              <Typography variant='body'>{FILLER}</Typography>
            </Container>
          ))}
          <Container className='p-2'>
            <Button
              variant={popperOpen ? 'primary' : 'secondary'}
              onClick={handleClick}
            >
              Toggle Popper
            </Button>
            <Popper
              open={popperOpen}
              anchorEl={anchorEl}
              placement='bottom'
              autoWidth={false}
              disablePortal
            >
              <Container
                top={SPACING_4}
                bottom={SPACING_4}
                left={SPACING_4}
                right={SPACING_4}
                className='bg-white border border-gray-400 rounded-sm p-2'
              >
                <Typography size='small'>Popper content</Typography>
                <Typography size='small'>Popper content</Typography>
                <Typography size='small'>Popper content</Typography>
                <Typography size='small'>Popper content</Typography>
              </Container>
            </Popper>
          </Container>
          {Array.from({ length: 6 }, (_, index) => (
            <Container key={index} top={SPACING_4}>
              <Typography variant='body'>{FILLER}</Typography>
            </Container>
          ))}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const Example = () => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button onClick={showModal}>Open Modal</Button>
      <ModalWithPopper open={isOpen} onClose={hideModal} />
    </>
  )
}

export default Example
