import figma from '@figma/code-connect'
import React from 'react'
import { Modal } from '@toptal/picasso'

const REGULAR_MODAL_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12247-43855'
const FULL_SCREEN_MODAL_URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=12713-42200'

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'xs', Device: 'Desktop' },
  example: () => (
    <Modal open size='xsmall' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'sm', Device: 'Desktop' },
  example: () => (
    <Modal open size='small' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'md', Device: 'Desktop' },
  example: () => (
    <Modal open size='medium' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'lg', Device: 'Desktop' },
  example: () => (
    <Modal open size='large' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, REGULAR_MODAL_URL, {
  variant: { Size: 'xl', Device: 'Desktop' },
  example: () => (
    <Modal open size='xlarge' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})

figma.connect(Modal, FULL_SCREEN_MODAL_URL, {
  variant: { Device: 'Web' },
  example: () => (
    <Modal open size='full-screen' onClose={() => {}}>
      Modal content
    </Modal>
  ),
})
