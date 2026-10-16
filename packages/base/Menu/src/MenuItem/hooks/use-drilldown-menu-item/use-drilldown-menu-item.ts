import type { ReactElement } from 'react'
import type React from 'react'
import { useCallback, useContext, useState } from 'react'

import MenuContext from '../../../Menu/MenuContext'

export interface Props {
  key: string
  menu?: ReactElement
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useDrilldownMenuItem = (props: Props) => {
  const { key, menu, onMouseEnter } = props
  const {
    activeItemKey,
    onItemMouseEnter,
    onAwayClick,
    onItemOpen,
    onItemClose,
  } = useContext(MenuContext)
  const [isOpenedWithKeyboard, setIsOpenedWithKeyboard] = useState(false)
  const isOpened = key === activeItemKey

  const handleItemMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setIsOpenedWithKeyboard(false)

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

  const openMenuWithKeyboard = useCallback(() => {
    if (menu && onItemOpen) {
      setIsOpenedWithKeyboard(true)
      onItemOpen(key)
    }
  }, [key, menu, onItemOpen])

  const closeMenu = useCallback(() => {
    if (onItemClose) {
      onItemClose()
    }
  }, [onItemClose])

  return {
    isOpened,
    isOpenedWithKeyboard,
    onItemMouseEnter: handleItemMouseEnter,
    onAwayClick: handleAwayClick,
    openDrilldownMenuWithKeyboard: openMenuWithKeyboard,
    closeMenu,
  }
}

export default useDrilldownMenuItem
