import type { RefObject } from 'react'
import { useEffect, useState } from 'react'

const useMouseEnter = <T extends HTMLElement>(ref: RefObject<T>): boolean => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseHover = (event: MouseEvent) => {
      setIsMouseOver(event.type === 'mouseenter')
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
