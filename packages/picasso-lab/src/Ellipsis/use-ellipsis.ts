import React from 'react'

const useEllipsis = () => {
  const ref = React.useRef<HTMLDivElement>()
  const [isEllipsis, setIsEllipsis] = React.useState(false)

  const measure = () => {
    if (!ref || !ref.current) {
      return
    }
    setIsEllipsis(ref.current.scrollWidth >= ref.current.clientWidth)
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
