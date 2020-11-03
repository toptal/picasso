import React, {
  useContext,
  ReactNode,
  useRef,
  useEffect,
  useCallback
} from 'react'
import { ModalContext, ModalType } from 'react-modal-hook'

import PromptModal, {
  Props as PromptModalProps,
  PromptOptions
} from '../../PromptModal'

export interface ShowPromptOptions
  extends Pick<PromptModalProps, 'onSubmit' | 'title' | 'message'>,
    Partial<
      Omit<PromptModalProps, 'children' | 'onSubmit' | 'title' | 'message'>
    > {
  content?: (promptOptions: PromptOptions) => ReactNode
}

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
  const openedModalKeys = useRef<Set<string>>(new Set())

  const hideModal = useCallback(
    (key: string) => {
      openedModalKeys.current.delete(key)
      context.hideModal(key)
    },
    [context]
  )

  const showModal = (modal: ModalType) => {
    if (!isFunctionalComponent(modal)) {
      throw new Error(
        'Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.'
      )
    }

    const key = generateModalKey()

    openedModalKeys.current.add(key)

    context.showModal(key, modal)

    return key
  }

  const hideAllModals = useCallback(() => {
    const keys = [...openedModalKeys.current]

    keys.forEach(hideModal)
  }, [hideModal])

  // Hide all modals when component is unmount
  useEffect(() => {
    return hideAllModals
  }, [hideAllModals])

  const showPrompt = (options: ShowPromptOptions) => {
    const { content, onSubmit, onCancel, onClose, ...restOptions } = options

    const handleOnAfterSubmit = () => {
      hideModal(modalId)
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
        onSubmit={onSubmit}
        onAfterSubmit={handleOnAfterSubmit}
        onCancel={handleCancel}
        onClose={handleClose}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restOptions}
      >
        {content}
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
