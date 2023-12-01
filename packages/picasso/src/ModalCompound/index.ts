/* eslint-disable import/no-extraneous-dependencies */
import Modal from '@toptal/picasso-modal'
import ModalActions from '@toptal/picasso-modal-actions'
import ModalContent from '@toptal/picasso-modal-content'
import ModalTitle from '@toptal/picasso-modal-title'

export const ModalCompound = Object.assign(Modal, {
  Content: ModalContent,
  Actions: ModalActions,
  Title: ModalTitle,
})
