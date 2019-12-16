import { useLayoutEffect, useState } from 'react'

export interface ReferenceObject {
  getBoundingClientRect(): ClientRect
}

const useWidthOf = <T extends ReferenceObject>(element: T | null) => {
  const [menuWidth, setMenuWidth] = useState<string | undefined>()

  useLayoutEffect(() => {
    if (!element) {
      return
    }
    const { width } = element.getBoundingClientRect()

    setMenuWidth(`${width}px`)
  }, [element])

  return menuWidth
}

export default useWidthOf
