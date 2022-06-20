import Modal from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

export const ModalCompound = Object.assign(Modal, {
  Content: ModalContent,
  Actions: ModalActions,
  Title: ModalTitle,
})
