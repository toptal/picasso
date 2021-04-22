import React, { ReactElement } from 'react'

import useMenuItemKey from '../use-menu-item-key'
import useSliderMenuItem from '../use-slider-menu-item'

interface Props {
  menu?: ReactElement
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useMenuItem = (props: Props) => {
  const { menu, onClick } = props
  const key = useMenuItemKey()
  const { onItemClick } = useSliderMenuItem({ key, menu, onClick })

  return { onItemClick }
}

export default useMenuItem
