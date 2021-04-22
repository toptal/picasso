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

  return {
    ...useSliderMenuItem({ key, menu, onClick }),
    ...useDrilldownMenuItem({ key, menu })
  }
}

export default useMenuItem
