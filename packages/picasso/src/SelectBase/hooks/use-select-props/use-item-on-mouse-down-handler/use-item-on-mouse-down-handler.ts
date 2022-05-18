import { useCallback } from 'react'

const useItemOnMouseDownHandler = () =>
  useCallback((event: React.MouseEvent) => {
    // This prevents the activeElement from being changed
    // to the item so it can remain with the current activeElement
    // which is a more common use case.
    event.preventDefault()
  }, [])

export default useItemOnMouseDownHandler
