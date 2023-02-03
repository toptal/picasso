import React, {
  forwardRef,
  ReactNode,
  TableHTMLAttributes,
  useMemo,
} from 'react'
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Table as MUITable } from '@mui/material'
import { BaseProps } from '@toptal/picasso-shared'

import TableContext from './TableContext'
import styles from './styles'

export interface Props
  extends BaseProps,
    TableHTMLAttributes<HTMLTableElement> {
  /** Children components (`Table.Head`, `Table.Body`, `Table.Footer`) */
  children: ReactNode
  /** Inner spacing */
  spacing?: 'compact' | 'narrow' | 'regular'
  /** Appearance variant */
  variant?: 'clear' | 'bordered' | 'striped'
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'Table',
})

// eslint-disable-next-line react/display-name
export const Table = forwardRef<HTMLTableElement, Props>(function Table(
  props,
  ref
) {
  const {
    className,
    style,
    children,
    spacing = 'regular',
    variant = 'bordered',
    ...rest
  } = props
  const classes = useStyles()

  const tableConfig = useMemo(() => ({ spacing, variant }), [spacing, variant])

  return (
    <TableContext.Provider value={tableConfig}>
      <MUITable
        {...rest}
        ref={ref}
        classes={classes}
        className={className}
        style={style}
      >
        {children}
      </MUITable>
    </TableContext.Provider>
  )
})

Table.defaultProps = {
  spacing: 'regular',
  variant: 'bordered',
}

Table.displayName = 'Table'

export default Table
