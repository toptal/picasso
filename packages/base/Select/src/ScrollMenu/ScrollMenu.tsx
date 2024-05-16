import type { ReactNode, RefObject } from 'react'
import React, { useRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { useIsomorphicLayoutEffect } from '@toptal/picasso-utils'
import { Menu } from '@toptal/picasso-menu'
import { twJoin, twMerge } from 'tailwind-merge'

export interface Props extends BaseProps {
  children: React.ReactNode
  selectedIndex?: number | null
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  fixedHeader?: ReactNode
  fixedFooter?: ReactNode
  role?: 'listbox' | 'menu'
  testIds?: {
    root?: string
    list?: string
  }
}

const getMenuSelectedNode = (
  menuRef: RefObject<HTMLDivElement>,
  selectedIndex?: number | null
) =>
  typeof selectedIndex === 'number'
    ? menuRef.current?.children[selectedIndex]
    : undefined

export const scrollToSelection = (
  menuRef: RefObject<HTMLDivElement>,
  selectedIndex?: number | null
) => {
  const menuNode = menuRef.current
  const selectedNode = getMenuSelectedNode(menuRef, selectedIndex)

  if (!menuNode || !selectedNode) {
    return
  }

  const menuRect = menuNode.getBoundingClientRect()
  const selectedRect = selectedNode.getBoundingClientRect()

  if (selectedRect.top < menuRect.top) {
    menuNode.scrollTop -= menuRect.top - selectedRect.top
  } else if (selectedRect.bottom > menuRect.bottom) {
    menuNode.scrollTop += selectedRect.bottom - menuRect.bottom
  }
}

const preventClick = (e: React.MouseEvent) => {
  // ScrollMenu is used in dropdowns.
  // When clicking on the scrollView, the dropdown should not close.
  e.preventDefault()
}

const ScrollMenu = (props: Props) => {
  const {
    selectedIndex,
    onBlur,
    children,
    style,
    fixedHeader,
    fixedFooter,
    className,
    role,
    testIds,
    'data-testid': dataTestId,
    ...rest
  } = props
  const menuRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(
    () => scrollToSelection(menuRef, selectedIndex),
    [selectedIndex]
  )

  return (
    <Menu
      className={twMerge('bg-white', className)}
      style={style}
      role={role}
      data-testid={dataTestId || testIds?.root}
      {...rest}
    >
      {fixedHeader}
      <div onMouseDown={preventClick}>
        <div
          data-testid={testIds?.list}
          ref={menuRef}
          className={twJoin(
            'overflow-y-auto',
            'max-h-[26.875rem]',
            '[@media(max-height:585px)]:max-h-[calc(50vh-4.3125rem)]',
            '[@media(max-height:585px)]:md:max-h-[calc(50vh-4.8125rem)]'
          )}
          onBlur={onBlur}
        >
          {children}
        </div>
        {fixedFooter}
      </div>
    </Menu>
  )
}

ScrollMenu.defaultProps = {
  role: 'menu',
}

ScrollMenu.displayName = 'ScrollMenu'

export default ScrollMenu
