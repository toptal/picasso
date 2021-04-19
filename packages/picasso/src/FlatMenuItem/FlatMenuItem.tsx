import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { OverridableComponent } from '@toptal/picasso-shared'

import FlatMenuContext, {
  FlatMenuContextProps
} from '../FlatMenu/FlatMenuContext'
import MenuListItem, { MenuListItemProps } from '../MenuListItem'

export type VariantType = 'light' | 'dark'

export type Props = Omit<MenuListItemProps, 'contentRef'>

const generateKey = (() => {
  let count = 0

  return () => String(++count)
})()

export const FlatMenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function FlatMenuItem (props, ref) {
  const { className, style, menu, onClick, ...rest } = props
  const [key] = useState(generateKey)
  const { push, refresh } = useContext<FlatMenuContextProps>(FlatMenuContext)

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
      menu={menu}
      onClick={handleClick}
    />
  )
})

FlatMenuItem.displayName = 'FlatMenuItem'

export default FlatMenuItem
