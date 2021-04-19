import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { OverridableComponent } from '@toptal/picasso-shared'

import MenuListItem, { MenuListItemProps } from '../MenuListItem'
import StackMenuContext, {
  StackMenuContextProps
} from '../StackMenu/StackMenuContext'

export type VariantType = 'light' | 'dark'

export type Props = Omit<MenuListItemProps, 'contentRef'>

const generateKey = (() => {
  let count = 0

  return () => String(++count)
})()

export const StackMenuItem: OverridableComponent<Props> = forwardRef<
  HTMLElement,
  Props
>(function StackMenuItem (props, ref) {
  const { className, style, menu, onClick, ...rest } = props
  const [key] = useState(generateKey)
  const { push, refresh } = useContext<StackMenuContextProps>(StackMenuContext)

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

StackMenuItem.displayName = 'StackMenuItem'

export default StackMenuItem
