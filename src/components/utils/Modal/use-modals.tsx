import { useContext } from 'react'
import { ModalContext, ModalType } from 'react-modal-hook'

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

  const showPrompt = () => {
    // show the prompt modal here by using
    // showModal function :top:
  }

  return {
    showModal,
    showPrompt,
    hideModal
  }
}

export { useModals }
