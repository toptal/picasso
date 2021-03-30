import React, { forwardRef, HTMLAttributes, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableCell from '@material-ui/core/TableCell'
import { BaseProps, TextLabelProps, useTitleCase } from '@toptal/picasso-shared'
import cx from 'classnames'

import toTitleCase from '../utils/to-title-case'
import styles from './styles'
import { TableContext, TableSectionContext, TableSection } from '../Table'

type AlignType = 'inherit' | 'left' | 'center' | 'right' | 'justify'

export interface Props
  extends BaseProps,
    TextLabelProps,
    HTMLAttributes<HTMLTableCellElement> {
  /** Set the text-align on the table cell content */
  align?: AlignType
  /** Indicates for how many columns the cell extends */
  colSpan?: number
  /** Indicates for how many rows the cell extends */
  rowSpan?: number
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoTableCell' })

export const TableCell = forwardRef<HTMLTableCellElement, Props>(
  function TableCell(props, ref) {
    const {
      align,
      className,
      style,
      children,
      colSpan,
      rowSpan,
      titleCase: propsTitleCase,
      ...rest
    } = props

    const {
      compact: compactClass,
      footer: footerClass,
      header: headerClass,
      narrow: narrowClass,
      ...muiClasses
    } = useStyles()
    const { variant } = useContext(TableContext)
    const tableSection = useContext(TableSectionContext)
    const isHead = tableSection === TableSection.HEAD
    const isFooter = tableSection === TableSection.FOOTER
    const titleCase = useTitleCase(propsTitleCase)

    const renderChildren = () =>
      isHead && titleCase ? toTitleCase(children) : children

    return (
      <MUITableCell
        {...rest}
        ref={ref}
        align={align}
        classes={muiClasses}
        className={cx(className, {
          [compactClass]: variant === 'compact',
          [narrowClass]: variant === 'narrow',
          [footerClass]: isFooter,
          [headerClass]: isHead
        })}
        style={style}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {renderChildren()}
      </MUITableCell>
    )
  }
)

TableCell.defaultProps = {
  align: 'inherit'
}

TableCell.displayName = 'TableCell'

export default TableCell
