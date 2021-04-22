import { useMemo } from 'react'

import { MenuMode } from '../../types'
import useDrilldownMenu from '../use-drilldown-menu'
import useSliderMenu from '../use-slider-menu'

export interface Props {
  mode?: MenuMode
}

const useMenu = (props: Props) => {
  const { mode } = props

  const {
    menu,
    hasBackButton,
    onItemClick,
    onItemUpdate,
    onBackClick
  } = useSliderMenu()

  const {
    activeItemKey,
    onItemMouseEnter,
    onMenuMouseLeave,
    onAwayClick
  } = useDrilldownMenu()

  const context = useMemo(
    () =>
      mode !== 'drilldown'
        ? {
            onItemClick,
            onItemUpdate,
            onBackClick
          }
        : {
            activeItemKey,
            onItemMouseEnter,
            onMenuMouseLeave,
            onAwayClick
          },
    [
      mode,
      activeItemKey,
      onItemClick,
      onItemUpdate,
      onBackClick,
      onItemMouseEnter,
      onMenuMouseLeave,
      onAwayClick
    ]
  )

  return { menu, context, hasBackButton }
}

export default useMenu
