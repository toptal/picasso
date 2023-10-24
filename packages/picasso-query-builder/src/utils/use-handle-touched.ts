import { useCallback, useEffect, useState } from 'react'

const useHandleTouched = ({
  submitButtonClicked,
}: {
  submitButtonClicked: boolean
}) => {
  const [touched, setTouched] = useState(false)

  const handleTouched = useCallback((value = true) => {
    setTouched(value)
  }, [])

  useEffect(() => {
    if (submitButtonClicked) {
      setTouched(true)
    }
  }, [submitButtonClicked])

  return {
    handleTouched,
    touched,
  }
}

export default useHandleTouched
