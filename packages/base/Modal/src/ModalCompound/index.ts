import { Modal } from '../Modal'
import { ModalActions } from '../ModalActions'
import { ModalContent } from '../ModalContent'
import { ModalTitle } from '../ModalTitle'

type ModalCompoundType = typeof Modal & {
  Content: typeof ModalContent
  Actions: typeof ModalActions
  Title: typeof ModalTitle
}

export const ModalCompound: ModalCompoundType = Object.assign(Modal, {
  Content: ModalContent,
  Actions: ModalActions,
  Title: ModalTitle,
})
