import type { KeyboardEvent, KeyboardEventHandler, RefObject } from 'react'
import { useEffect, useRef } from 'react'

export interface Props {
  menuRef: RefObject<HTMLUListElement>
  autoFocus?: boolean
  isShowingInnerMenu: boolean
  onBack?: () => void
  onKeyDown?: KeyboardEventHandler<HTMLUListElement>
}

const getEnabledItems = (menu: HTMLElement) =>
  Array.from(menu.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement &&
      Boolean(child.getAttribute('role')?.startsWith('menuitem')) &&
      child.getAttribute('aria-disabled') !== 'true'
  )

const focusActiveItem = (menu: HTMLElement) => {
  const items = getEnabledItems(menu)
  const activeItem = items.find(item => item.tabIndex === 0) ?? items[0]

  activeItem?.focus()
}

const getTargetIndex = (key: string, currentIndex: number, count: number) => {
  switch (key) {
    case 'ArrowDown':
      return (currentIndex + 1) % count
    case 'ArrowUp':
      return currentIndex <= 0 ? count - 1 : currentIndex - 1
    case 'Home':
      return 0
    case 'End':
      return count - 1
    default:
      return undefined
  }
}

const useMenuKeyboardNavigation = ({
  menuRef,
  autoFocus,
  isShowingInnerMenu,
  onBack,
  onKeyDown,
}: Props) => {
  const wasShowingInnerMenu = useRef(isShowingInnerMenu)

  useEffect(() => {
    if (autoFocus && menuRef.current) {
      focusActiveItem(menuRef.current)
    }
  }, [autoFocus, menuRef])

  useEffect(() => {
    if (wasShowingInnerMenu.current && !isShowingInnerMenu && menuRef.current) {
      focusActiveItem(menuRef.current)
    }

    wasShowingInnerMenu.current = isShowingInnerMenu
  }, [isShowingInnerMenu, menuRef])

  return (event: KeyboardEvent<HTMLUListElement>) => {
    onKeyDown?.(event)

    const menu = menuRef.current

    if (event.defaultPrevented || !menu) {
      return
    }

    if (event.key === 'ArrowLeft' && onBack) {
      event.preventDefault()
      onBack()

      return
    }

    const items = getEnabledItems(menu)
    const currentIndex = items.indexOf(event.target as HTMLElement)

    if (!items.length || (currentIndex === -1 && event.target !== menu)) {
      return
    }

    const targetIndex = getTargetIndex(event.key, currentIndex, items.length)

    if (targetIndex === undefined) {
      return
    }

    event.preventDefault()
    items[targetIndex].focus()
  }
}

export default useMenuKeyboardNavigation
