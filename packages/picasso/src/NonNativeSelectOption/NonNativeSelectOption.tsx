import React, { ReactNode } from 'react'
import { SizeType } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Theme, makeStyles } from '@material-ui/core/styles'

import MenuItem from '../MenuItem'
import { Option, ValueType } from '../Select'
import styles from './styles'

export interface Props<T extends ValueType> {
  children?: ReactNode
  description?: ReactNode
  onMouseDown: (event: React.MouseEvent) => void
  onMouseEnter: () => void
  selected: boolean
  highlighted: boolean
  size?: SizeType<'small' | 'medium'>
  onClick: (event: React.MouseEvent) => void
  option: Option<T>
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoNonNativeSelectOption'
})

const NonNativeSelectOption = React.memo(
  <T extends ValueType>({
    option,
    size,
    onMouseDown,
    onMouseEnter,
    selected,
    highlighted,
    onClick,
    description,
    children
  }: Props<T>) => {
    const classes = useStyles()

    return (
      <MenuItem
        role='option'
        aria-selected={highlighted}
        value={option.value}
        size={size}
        selected={highlighted}
        checkmarked={selected}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        titleCase={false}
        description={description}
        disabled={option.disabled}
        className={cx({
          [classes.disabled]: option.disabled
        })}
      >
        {children}
      </MenuItem>
    )
  }
)

NonNativeSelectOption.displayName = 'NonNativeSelectOption'

export default NonNativeSelectOption
