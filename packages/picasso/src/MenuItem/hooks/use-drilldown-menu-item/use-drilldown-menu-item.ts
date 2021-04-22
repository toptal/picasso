import { ReactElement, useCallback, useContext } from 'react'

import MenuContext from '../../../Menu/MenuContext'

export interface Props {
  key: string
  menu?: ReactElement
}

const useDrilldownMenuItem = (props: Props) => {
  const { key, menu } = props
  const { activeItemKey, onItemMouseEnter, onAwayClick } = useContext(
    MenuContext
  )
  const isOpened = key === activeItemKey

  const handleItemMouseEnter = useCallback(() => {
    if (onItemMouseEnter) {
      onItemMouseEnter(key, menu)
    }
  }, [key, menu, onItemMouseEnter])

  const handleAwayClick = useCallback(() => {
    if (onAwayClick) {
      onAwayClick()
    }
  }, [onAwayClick])

  return {
    isOpened,
    onItemMouseEnter: handleItemMouseEnter,
    onAwayClick: handleAwayClick
  }
}

export default useDrilldownMenuItem
