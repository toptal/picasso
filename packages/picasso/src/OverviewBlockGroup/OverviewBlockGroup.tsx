import type { HTMLAttributes, ReactNode, ReactComponentElement } from 'react'
import React from 'react'

import type { Alignment, BlockWidth } from './settings'
import { OverviewBlockGroupContext } from './OverviewBlockGroupContext'
import OverviewBlockRow from '../OverviewBlockRow'

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Value and label alignment for blocks. By default content is aligned to the left. */
  align?: Alignment
  /** The block width variant */
  blockWidth?: BlockWidth
}

// We need to inject a single row if there is none provided.
// It allows to skip `OverviewBlock.Row` component for a single-row groups.
const shouldInjectRow = (children?: ReactNode) => {
  if (!children) {
    return false
  }

  return !React.Children.toArray(children)
    .filter((el): el is ReactComponentElement<typeof OverviewBlockRow> =>
      React.isValidElement(el)
    )
    .some(el => el.type.displayName === OverviewBlockRow.displayName)
}

const OverviewBlockGroup = (props: Props) => {
  const { children, align = 'default', blockWidth = 'regular', ...rest } = props

  return (
    <section {...rest}>
      <OverviewBlockGroupContext.Provider value={{ align, blockWidth }}>
        {shouldInjectRow(children) ? (
          <OverviewBlockRow>{children}</OverviewBlockRow>
        ) : (
          children
        )}
      </OverviewBlockGroupContext.Provider>
    </section>
  )
}

OverviewBlockGroup.displayName = 'OverviewBlockGroup'

OverviewBlockGroup.defaultProps = {
  align: 'default',
  blockWidth: 'regular',
}

export default OverviewBlockGroup
