import { useEffect, useState, useMemo } from 'react'

interface UseOnScreenProps {
  ref: React.RefObject<HTMLElement>
  root?: React.RefObject<HTMLElement>
  rootMargin?: string
  threshold?: number | number[]
}

const useOnScreen = ({
  ref,
  root,
  rootMargin,
  threshold,
}: UseOnScreenProps) => {
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          setIntersecting(entry.isIntersecting)
        },
        {
          root: root?.current,
          rootMargin,
          threshold,
        }
      ),
    [root, rootMargin, threshold]
  )

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [observer, ref])

  return isIntersecting
}

export default useOnScreen
