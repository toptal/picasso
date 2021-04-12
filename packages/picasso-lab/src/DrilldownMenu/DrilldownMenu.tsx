import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'
import SelectList, { SelectListAttributes } from '@toptal/picasso/SelectList'
import React, { forwardRef, ReactNode, useMemo, useState } from 'react'

import DrilldownMenuItem from '../DrilldownMenuItem'
import DrilldownMenuContext from './DrilldownMenuContext'

export interface Props extends BaseProps, SelectListAttributes {
  /* Menu items */
  children?: ReactNode
}

export interface StaticProps {
  Item: typeof DrilldownMenuItem
}

export const DrilldownMenu = forwardRef<HTMLUListElement, Props>(
  function Drilldown (props, ref) {
    const { className, style, children, ...rest } = props
    const [activeMenuKey, setActiveMenuKey] = useState<string>()
    const context = useMemo(() => ({ activeMenuKey, setActiveMenuKey }), [
      activeMenuKey
    ])

    return (
      <DrilldownMenuContext.Provider value={context}>
        <SelectList {...rest} ref={ref} className={className} style={style}>
          {children}
        </SelectList>
      </DrilldownMenuContext.Provider>
    )
  }
) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

DrilldownMenu.Item = DrilldownMenuItem

export default DrilldownMenu
