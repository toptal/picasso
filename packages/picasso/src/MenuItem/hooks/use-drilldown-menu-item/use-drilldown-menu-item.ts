import React, { ReactElement, useCallback, useContext } from 'react'

import MenuContext from '../../../Menu/MenuContext'

export interface Props {
  key: string
  menu?: ReactElement
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useDrilldownMenuItem = (props: Props) => {
  const { key, menu, onMouseEnter } = props
  const { activeItemKey, onItemMouseEnter, onAwayClick } = useContext(
    MenuContext
  )
  const isOpened = key === activeItemKey

  const handleItemMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (onMouseEnter) {
        onMouseEnter(event)
      }

      if (onItemMouseEnter) {
        onItemMouseEnter(key, menu)
      }
    },
    [key, menu, onMouseEnter, onItemMouseEnter]
  )

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
