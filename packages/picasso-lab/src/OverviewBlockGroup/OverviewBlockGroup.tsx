import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  ReactElement
} from 'react'

import OverviewBlockRow from '../OverviewBlockRow'

type Props = HTMLAttributes<HTMLDivElement>

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
  const { children, ...rest } = props

  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {shouldInjectRow(children) ? (
        <OverviewBlockRow>{children}</OverviewBlockRow>
      ) : (
        children
      )}
    </section>
  )
}

OverviewBlockGroup.displayName = 'OverviewBlockGroup'

export default OverviewBlockGroup
