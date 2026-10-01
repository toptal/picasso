import figma from '@figma/code-connect'
import React from 'react'
import { Modal } from '@toptal/picasso'

// Figma "Device" is not restricted: the Modal code is the same on every device.

const REGULAR_MODAL_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12247-43855'
const FULL_SCREEN_MODAL_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12713-42200'

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'xs' },
  example: () => (
    <Modal open size='xsmall' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'sm' },
  example: () => (
    <Modal open size='small' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'md' },
  example: () => (
    <Modal open size='medium' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'lg' },
  example: () => (
    <Modal open size='large' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'xl' },
  example: () => (
    <Modal open size='xlarge' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, FULL_SCREEN_MODAL_URL, {
  example: () => (
    <Modal open size='full-screen' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})
