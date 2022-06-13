import React, { forwardRef, HTMLAttributes, useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MUITableCell from '@material-ui/core/TableCell'
import {
  BaseProps,
  ColorType,
  SizeType,
  TextLabelProps,
  useTitleCase,
} from '@toptal/picasso-shared'
import cx from 'classnames'

import toTitleCase from '../utils/to-title-case'
import styles from './styles'
import { TableContext, TableSectionContext, TableSection } from '../Table'
import Typography from '../Typography'

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

type TypographySettings = {
  color: ColorType
  size: SizeType<'xsmall' | 'small'>
  weight: 'regular' | 'semibold' | 'inherit'
}
const getTypographySettings = (
  tableSection: TableSection | undefined
): TypographySettings => {
  switch (tableSection) {
    case TableSection.HEAD:
      return {
        color: 'dark-grey',
        size: 'xsmall',
        weight: 'semibold',
      }
    case TableSection.FOOTER:
      return {
        color: 'black',
        size: 'small',
        weight: 'semibold',
      }
    default:
      return {
        color: 'dark-grey',
        size: 'small',
        weight: 'inherit',
      }
  }
}

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
      narrow: narrowClass,
      ...muiClasses
    } = useStyles()
    const { spacing } = useContext(TableContext)
    const tableSection = useContext(TableSectionContext)
    const isHead = tableSection === TableSection.HEAD
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
          [compactClass]: spacing === 'compact',
          [narrowClass]: spacing === 'narrow',
        })}
        style={style}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        <Typography as='div' {...getTypographySettings(tableSection)}>
          {renderChildren()}
        </Typography>
      </MUITableCell>
    )
  }
)

TableCell.defaultProps = {
  align: 'inherit',
}

TableCell.displayName = 'TableCell'

export default TableCell
