import { useMemo } from 'react'

import useSliderMenu from '../use-slider-menu'

const useMenu = () => {
  const { menu, onItemClick, onItemUpdate, onBackClick } = useSliderMenu()

  const context = useMemo(() => ({ onItemClick, onItemUpdate, onBackClick }), [
    onItemClick,
    onItemUpdate,
    onBackClick
  ])

  return { menu, context }
}

export default useMenu
