import { useMemo } from 'react'

import { MenuContextProps } from '../../MenuContext'
import useSliderMenu from '../use-slider-menu'

const useMenuContext = () => {
  const { onItemClick, onBackClick, onItemUpdate } = useSliderMenu()

  return useMemo(
    (): MenuContextProps => ({
      onItemClick,
      onBackClick,
      onItemUpdate
    }),
    [onItemClick, onBackClick, onItemUpdate]
  )
}

export default useMenuContext
