import { useState } from 'react'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-shared'

export interface ReferenceObject {
  offsetParent?: Element
  getBoundingClientRect: () => ClientRect
}

const useWidthOf = <T extends ReferenceObject>(element: T | null) => {
  const [menuWidth, setMenuWidth] = useState<string | undefined>()

  const offsetParent = element?.offsetParent

  useIsomorphicLayoutEffect(() => {
    if (!element) {
      return
    }
    const { width } = element.getBoundingClientRect()

    setMenuWidth(`${width}px`)
  }, [element, offsetParent])

  return menuWidth
}

export default useWidthOf
