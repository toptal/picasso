import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'
import MenuList, { MenuListAttributes } from '@toptal/picasso/MenuList'
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useMemo,
  useState
} from 'react'

import DrilldownMenuItem from '../DrilldownMenuItem'
import DrilldownMenuContext, {
  DrilldownMenuContextProps
} from './DrilldownMenuContext'

export interface Props extends BaseProps, MenuListAttributes {
  /* Menu items */
  children?: ReactNode
}

export interface StaticProps {
  Item: typeof DrilldownMenuItem
}

export const DrilldownMenu = forwardRef<HTMLUListElement, Props>(
  function Drilldown (props, ref) {
    const { className, style, children, ...rest } = props
    const [activeItemKey, setActiveItemKey] = useState<string>()

    const clearActiveItemKey = useCallback(
      () => setActiveItemKey(undefined),
      []
    )

    const contextValue = useMemo(
      (): DrilldownMenuContextProps => ({
        activeItemKey,
        onMouseEnter: setActiveItemKey,
        onClickAway: clearActiveItemKey
      }),
      [activeItemKey, clearActiveItemKey]
    )

    return (
      <DrilldownMenuContext.Provider value={contextValue}>
        <MenuList
          {...rest}
          ref={ref}
          className={className}
          style={style}
          onMouseLeave={clearActiveItemKey}
        >
          {children}
        </MenuList>
      </DrilldownMenuContext.Provider>
    )
  }
) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

DrilldownMenu.Item = DrilldownMenuItem

export default DrilldownMenu
