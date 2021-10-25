import React, { ReactNode } from 'react'
import { SizeType } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core'
import cx from 'classnames'

import MenuItem from '../MenuItem'
import { ItemProps, Option, ValueType } from '../Select'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles)

export interface Props<T extends ValueType> extends ItemProps {
  children?: ReactNode
  description?: ReactNode
  selected: boolean
  highlighted: boolean
  size?: SizeType<'small' | 'medium'>
  option: Option<T>
}

const NonNativeSelectOption = React.memo(
  <T extends ValueType>({
    option,
    size,
    selected,
    highlighted,
    description,
    children,
    ...itemProps
  }: Props<T>) => {
    const classes = useStyles()

    return (
      <MenuItem
        className={cx(classes.root, { [classes.disabled]: option.disabled })}
        value={option.value}
        size={size}
        selected={highlighted}
        checkmarked={selected}
        titleCase={false}
        description={description}
        role='option'
        aria-selected={selected}
        data-highlighted={highlighted}
        disabled={option.disabled}
        {...itemProps}
      >
        {children}
      </MenuItem>
    )
  }
)

NonNativeSelectOption.displayName = 'NonNativeSelectOption'

export default NonNativeSelectOption
