import { useEffect, useState, RefObject } from 'react'

const useMouseEnter = <T extends HTMLElement>(ref: RefObject<T>): boolean => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseHover = (event: MouseEvent) => {
      if (event.type === 'mouseenter') {
        setIsMouseOver(true)
      }

      if (event.type === 'mouseleave') {
        setIsMouseOver(false)
      }
    }

    const node = ref.current

    if (node) {
      node.addEventListener('mouseenter', handleMouseHover)
      node.addEventListener('mouseleave', handleMouseHover)
    }

    return () => {
      if (node) {
        node.removeEventListener('mouseenter', handleMouseHover)
        node.removeEventListener('mouseleave', handleMouseHover)
      }
    }
  }, [ref])

  return isMouseOver
}

export default useMouseEnter
