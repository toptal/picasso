import React, { ReactElement, useCallback, useContext, useEffect } from 'react'

import MenuContext from '../../../Menu/MenuContext'

export interface Props {
  key: string
  menu?: ReactElement
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useSliderMenuItem = (props: Props) => {
  const { key, menu, onClick } = props
  const { onItemClick, onItemUpdate } = useContext(MenuContext)

  useEffect(() => {
    if (menu && onItemUpdate) {
      onItemUpdate(key, menu)
    }
  }, [key, menu, onItemUpdate])

  const handleItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (menu && onItemClick) {
        event.stopPropagation()
        onItemClick(key, menu)
      }

      if (onClick) {
        onClick(event)
      }
    },
    [key, menu, onClick, onItemClick]
  )

  return {
    onItemClick: handleItemClick
  }
}

export default useSliderMenuItem
