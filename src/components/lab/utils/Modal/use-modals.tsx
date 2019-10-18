import React, { useContext } from 'react'
import { ModalContext, ModalType } from 'react-modal-hook'

import PromptModal from '../../PromptModal'
import { Props as PromptModalProps } from '../../PromptModal/PromptModal'

const isFunctionalComponent = (Component: Function) => {
  const prototype = Component.prototype

  return !prototype || !prototype.isReactComponent
}

const generateModalKey = (() => {
  let count = 0

  return () => `${++count}`
})()

const useModals = () => {
  const context = useContext(ModalContext)

  const hideModal = (key: string) => {
    context.hideModal(key)
  }

  const showModal = (modal: ModalType) => {
    if (!isFunctionalComponent(modal)) {
      throw new Error(
        'Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.'
      )
    }

    const key = generateModalKey()

    context.showModal(key, modal)

    return key
  }

  const showPrompt = (
    options: Pick<PromptModalProps, 'onSubmit' | 'title' | 'message'> &
      Partial<PromptModalProps>
  ) => {
    const { children, onSubmit, onCancel, onClose, ...restOptions } = options

    const handleSubmit = async (result: any) => {
      const submitError = await onSubmit(result)

      if (submitError === undefined) {
        hideModal(modalId)
        return
      }

      return submitError
    }

    const handleCancel = () => {
      if (onCancel) {
        onCancel()
      }

      hideModal(modalId)
    }

    const handleClose = () => {
      if (onClose) {
        onClose()
      }

      hideModal(modalId)
    }

    const modalId = showModal(() => (
      <PromptModal
        open
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onClose={handleClose}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restOptions}
      >
        {children}
      </PromptModal>
    ))
  }

  return {
    showModal,
    showPrompt,
    hideModal
  }
}

export { useModals }
