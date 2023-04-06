import type { ReactElement } from 'react'
import type React from 'react'
import { useCallback, useContext, useMemo, useState } from 'react'

import type { MenuContextProps } from '../../MenuContext'
import MenuContext from '../../MenuContext'

const useSlideMenu = () => {
  const [items, setItems] = useState<Record<string, ReactElement>>({})
  const { onItemUpdate, onItemClick, onBackClick } = useContext(MenuContext)

  const lastKey = useMemo(() => {
    const keys = Object.keys(items)

    return keys.length ? keys[keys.length - 1] : undefined
  }, [items])

  const lastMenu = useMemo(() => {
    return lastKey && items[lastKey]
  }, [items, lastKey])

  const handleItemUpdate = useCallback(
    (key: string, menu?: ReactElement) => {
      if (menu && items[key]) {
        setItems({ ...items, [key]: menu })
      }
    },
    [items]
  )

  const handleItemClick = useCallback(
    (key: string, menu?: ReactElement) => {
      if (menu) {
        setItems({ ...items, [key]: menu })
      }
    },
    [items]
  )

  const handleBackClick = useCallback(
    (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (event) {
        event.stopPropagation()
      }

      if (lastKey) {
        const newItems = { ...items }

        delete newItems[lastKey]
        setItems(newItems)
      }
    },
    [items, lastKey]
  )

  const context = useMemo(
    (): MenuContextProps => ({
      variant: 'slide',
      onItemUpdate: onItemUpdate ?? handleItemUpdate,
      onItemClick: onItemClick ?? handleItemClick,
      onBackClick: onBackClick ?? handleBackClick,
    }),
    [
      onItemUpdate,
      onItemClick,
      onBackClick,
      handleItemUpdate,
      handleItemClick,
      handleBackClick,
    ]
  )

  return {
    context,
    innerMenu: lastMenu,
    hasBackButton: Boolean(onBackClick),
  }
}

export default useSlideMenu
