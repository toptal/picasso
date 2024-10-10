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
  const [isOnScreen, setIsOnScreen] = useState(false)
  const [isObserved, setObserved] = useState(false)

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => {
          setIsOnScreen(entry.isIntersecting)
          setObserved(true)
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

  return { isOnScreen, isObserved }
}

export default useOnScreen
