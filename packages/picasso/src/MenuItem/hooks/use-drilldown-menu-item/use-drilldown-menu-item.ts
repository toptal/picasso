import { ReactElement, useCallback, useContext } from 'react'

import MenuContext from '../../../Menu/MenuContext'

export interface Props {
  key: string
  menu?: ReactElement
}

const useDrilldownMenuItem = (props: Props) => {
  const { key, menu } = props
  const { activeItemKey, onItemMouseEnter } = useContext(MenuContext)
  const isOpened = key === activeItemKey

  const handleItemMouseEnter = useCallback(() => {
    if (menu && onItemMouseEnter) {
      onItemMouseEnter(key)
    }
  }, [key, menu, onItemMouseEnter])

  return {
    isOpened,
    onItemMouseEnter: handleItemMouseEnter
  }
}

export default useDrilldownMenuItem
