import React, { ReactElement } from 'react'

import useMenuItemKey from '../use-menu-item-key'
import useSliderMenuItem from '../use-slider-menu-item'
import useDrilldownMenuItem from '../use-drilldown-menu-item'

interface Props {
  menu?: ReactElement
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useMenuItem = (props: Props) => {
  const { menu, onClick } = props
  const key = useMenuItemKey()
  const { onItemClick } = useSliderMenuItem({ key, menu, onClick })
  const { isOpened, onItemMouseEnter } = useDrilldownMenuItem({ key, menu })

  return { isOpened, onItemClick, onItemMouseEnter }
}

export default useMenuItem
