import React, { useEffect, useState, useMemo } from 'react'

const useOnScreen = (ref: React.RefObject<HTMLElement>) => {
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    []
  )

  useEffect(() => {
    if (ref.current) {
      const element = ref.current

      observer.observe(element)

      return () => observer.unobserve(element)
    }
  }, [observer, ref])

  return isIntersecting
}

export default useOnScreen
