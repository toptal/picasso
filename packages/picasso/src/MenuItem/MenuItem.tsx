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
import SelectListItem, { SelectListItemProps } from '../SelectListItem'

export type VariantType = 'light' | 'dark'

export interface Props extends Omit<SelectListItemProps, 'nested'> {
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
    <SelectListItem
      {...rest}
      ref={ref}
      className={className}
      style={style}
      nested={Boolean(menu)}
      onClick={handleClick}
    />
  )
})

MenuItem.defaultProps = {
  as: 'li',
  variant: 'light',
  nonSelectable: false
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
