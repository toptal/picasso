import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  ReactComponentElement
} from 'react'

import { Alignment, BlockWidth, SeparatorVariant } from './settings'
import { OverviewBlockGroupContext } from './OverviewBlockGroupContext'
import OverviewBlockRow from '../OverviewBlockRow'

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Value and label alignment for blocks. By default content is aligned to the left. */
  align?: Alignment
  /** The block width variant */
  blockWidth?: BlockWidth
  /** The vertical separator variant */
  separatorVariant?: SeparatorVariant
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

const OverviewBlockGroup: FunctionComponent<Props> = props => {
  const {
    children,
    align = 'default',
    blockWidth = 'regular',
    separatorVariant = 'default',
    ...rest
  } = props

  return (
    <section {...rest}>
      <OverviewBlockGroupContext.Provider
        value={{ align, blockWidth, separatorVariant }}
      >
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
  separatorVariant: 'default'
}

export default OverviewBlockGroup
