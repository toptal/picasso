import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  ReactElement
} from 'react'

import { Alignment, BlockWidth } from './settings'
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
    .filter((el): el is ReactElement => React.isValidElement(el))
    .some(el => el.type === OverviewBlockRow)
}

const OverviewBlockGroup: FunctionComponent<Props> = props => {
  const { children, align = 'default', blockWidth = 'regular', ...rest } = props

  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
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
  blockWidth: 'regular'
}

export default OverviewBlockGroup
