import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'
import SelectList, { SelectListAttributes } from '@toptal/picasso/SelectList'
import React, { forwardRef, useMemo, useState } from 'react'

import DrilldownItem from '../DrilldownItem'
import DrilldownContext from './DrilldownContext'

export interface Props extends BaseProps, SelectListAttributes {}

export interface StaticProps {
  Item: typeof DrilldownItem
}

const Drilldown = forwardRef<HTMLUListElement, Props>(function Drilldown (
  props,
  ref
) {
  const { className, style, children, ...rest } = props
  const [focusedKey, setFocusedKey] = useState<string>()
  const context = useMemo(() => ({ focusedKey, setFocusedKey }), [
    focusedKey
  ])

  return (
    <DrilldownContext.Provider value={context}>
      <SelectList {...rest} ref={ref} className={className} style={style}>
        {children}
      </SelectList>
    </DrilldownContext.Provider>
  )
}) as CompoundedComponentWithRef<Props, HTMLUListElement, StaticProps>

Drilldown.Item = DrilldownItem

export default Drilldown
