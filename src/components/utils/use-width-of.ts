import { useLayoutEffect, useState, RefObject } from 'react'

const useWidthOf = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [menuWidth, setMenuWidth] = useState<string | undefined>()

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const { width } = ref.current.getBoundingClientRect()

    setMenuWidth(`${width}px`)
  }, [ref.current])

  return menuWidth
}

export default useWidthOf
