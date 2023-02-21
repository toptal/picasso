import { useEffect, useState, RefObject } from 'react'

const useMouseEnter = <T extends HTMLElement>(ref: RefObject<T>): boolean => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsMouseOver(true)
    }

    const handleMouseLeave = () => {
      setIsMouseOver(false)
    }

    const node = ref.current

    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter)
      node.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseenter', handleMouseEnter)
        node.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [ref])

  return isMouseOver
}

export default useMouseEnter
