import { useContext, useEffect } from 'react'
import { ModalContext, ModalType } from 'react-modal-hook'

const isFunctionalComponent = (Component: Function) => {
  const prototype = Component.prototype

  return !prototype || !prototype.isReactComponent
}

const queue: Map<
  string,
  {
    hide: () => void
  }
> = new Map()

const generateModalId = () =>
  Math.random()
    .toString(36)
    .substr(2, 9)

const useModal = (component: ModalType, inputs: any[] = []) => {
  useEffect(() => {
    if (component || inputs) {
      window.console.warn(
        `The way you use 'useModal' hook is going to be deprecated in Picasso v4.`
      )
    }
  }, [])

  const context = useContext(ModalContext)

  const hideModal = (key: string) => {
    const modal = queue.get(key)

    if (!modal) {
      return
    }

    modal.hide()
  }

  const showModal = (component: ModalType) => {
    if (!isFunctionalComponent(component)) {
      throw new Error(
        'Only stateless components can be used as an argument to useModal. You have probably passed a class component where a function was expected.'
      )
    }

    const key = generateModalId()

    queue.set(key, {
      hide: () => context.hideModal(key)
    })

    context.showModal(key, component)

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

export { useModal }
