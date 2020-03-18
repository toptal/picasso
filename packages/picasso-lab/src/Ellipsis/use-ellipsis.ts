import React from 'react'

const useEllipsis = () => {
  const ref = React.useRef<HTMLDivElement>()
  const [isEllipsis, setIsEllipsis] = React.useState(false)

  const measure = () => {
    setIsEllipsis(
      (ref?.current?.scrollWidth ?? 0) > (ref?.current?.clientWidth ?? 0)
    )
  }

  React.useLayoutEffect(measure)

  React.useEffect(() => {
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [])

  return { ref, isEllipsis }
}

export default useEllipsis
