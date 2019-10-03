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
    title: string,
    message: string,
    options: Partial<
      Omit<
        PromptModalProps,
        'title' | 'message' | 'onSubmit' | 'onCancel' | 'onClose'
      >
    > = {}
  ) => {
    const { children } = options
    const hasChildren = Boolean(children)

    return new Promise(resolve => {
      const handleSubmit = (result?: any) => {
        resolve(hasChildren ? result : true)
        hideModal(modalId)
      }

      const handleClose = () => {
        resolve(false)
        hideModal(modalId)
      }

      const modalId = showModal(() => (
        <PromptModal
          open
          title={title}
          message={message}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          onClose={handleClose}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...options}
        >
          {children}
        </PromptModal>
      ))
    })
  }

  return {
    showModal,
    showPrompt,
    hideModal
  }
}

export { useModals }
