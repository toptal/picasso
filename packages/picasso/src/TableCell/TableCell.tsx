import React, { forwardRef, HTMLAttributes, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableCell from '@material-ui/core/TableCell'
import {
  mergeClasses,
  StandardProps,
  TextLabelProps,
  useTitleCase
} from '@toptal/picasso-shared'

import toTitleCase from '../utils/to-title-case'
import styles from './styles'
import { TableSectionContext } from '../Table'
import { TableSection } from '../Table/TableSectionContext'

type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify'

export interface Props
  extends StandardProps,
    TextLabelProps,
    HTMLAttributes<HTMLTableCellElement> {
  /** Set the text-align on the table cell content */
  align?: AlignType
  /** Indicates for how many columns the cell extends */
  colSpan?: number
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoTableCell' })

export const TableCell = forwardRef<HTMLTableCellElement, Props>(
  function TableCell(props, ref) {
    const {
      align,
      classes: externalClasses,
      className,
      style,
      children,
      colSpan,
      titleCase: propsTitleCase,
      ...rest
    } = props

    const classes = mergeClasses(useStyles(props), externalClasses)

    const tableSection = useContext(TableSectionContext)
    const titleCase = useTitleCase(propsTitleCase)

    return (
      <MUITableCell
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        align={align}
        classes={classes}
        className={className}
        style={style}
        colSpan={colSpan}
      >
        {tableSection === TableSection.HEAD && titleCase
          ? toTitleCase(children)
          : children}
      </MUITableCell>
    )
  }
)

TableCell.defaultProps = {
  align: 'inherit'
}

TableCell.displayName = 'TableCell'

export default TableCell
