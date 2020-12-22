import { useCallback, useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const hideModal = useCallback(() => setIsOpen(false), [setIsOpen])

  const showModal = useCallback(() => setIsOpen(true), [setIsOpen])

  return {
    showModal,
    hideModal,
    isOpen
  }
}

export { useModal }
