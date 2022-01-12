import { useCallback } from 'react'

const useEditorLoseFocusFixHandler = () => {
  const preventDefaultHandler: (
    this: Element,
    event: Event
  ) => void = useCallback(event => {
    event.preventDefault()
  }, [])

  return { preventDefaultHandler }
}

export default useEditorLoseFocusFixHandler
