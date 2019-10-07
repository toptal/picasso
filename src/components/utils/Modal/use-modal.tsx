import { useEffect } from 'react'
import { useModal as useReactModalHook, ModalType } from 'react-modal-hook'

const useModal = (component: ModalType, inputs: any[] = []) => {
  useEffect(() => {
    window.console.warn(
      'useModal hook is going to be deprecated in Picasso v4. Please, use useModals hook instead from @toptal/picasso/lab/utils'
    )
  }, [])

  return useReactModalHook(component, inputs)
}

export { useModal }
