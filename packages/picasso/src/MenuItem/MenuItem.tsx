import { OverridableComponent } from '@toptal/picasso-shared'
import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import MenuContext, { MenuContextProps } from '../Menu/MenuContext'
import MenuListItem, { MenuListItemProps } from '../MenuListItem'
import { noop } from '../utils'

export type VariantType = 'light' | 'dark'

export interface Props extends Omit<MenuListItemProps, 'arrow'> {
  /** Nested menu */
  menu?: ReactElement
}

const generateKey = (() => {
  let count = 0

  return () => String(++count)
})()

export const MenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function MenuItem (props, ref) {
  const { className, style, menu, onClick, ...rest } = props
  const [key] = useState(generateKey)
  const { push, refresh } = useContext<MenuContextProps>(MenuContext)

  useEffect(() => {
    if (menu && refresh) {
      refresh(key, menu)
    }
  }, [key, menu, refresh])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (menu && push) {
        event.stopPropagation()
        push(key, menu)
      }

      if (onClick) {
        onClick(event)
      }
    },
    [key, menu, push, onClick]
  )

  return (
    <MenuListItem
      {...rest}
      ref={ref}
      className={className}
      style={style}
      arrow={Boolean(menu)}
      onClick={handleClick}
    />
  )
})

MenuItem.defaultProps = {
  as: 'li',
  onClick: noop,
  variant: 'light',
  nonSelectable: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
