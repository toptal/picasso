import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef, useContext } from 'react'
import type {
  BaseProps,
  ColorType,
  SizeType,
  TextLabelProps,
} from '@toptal/picasso-shared'
import { useTitleCase } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'

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
  adornment?: ReactNode
}

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
      adornment,
      ...rest
    } = props

    const { spacing } = useContext(TableContext)
    const tableSection = useContext(TableSectionContext)
    const isHead = tableSection === TableSection.HEAD
    const titleCase = useTitleCase(propsTitleCase)

    const tooltipWithChildren = (
      <Typography
        align={align}
        as='div'
        titleCase={isHead && titleCase}
        {...getTypographySettings(tableSection)}
      >
        {children}
      </Typography>
    )

    const Component = isHead ? 'th' : 'td'

    const spacingClasses = {
      narrow: '',
      regular: 'px-4',
      compact: 'h-6 py-[1px] last:pr-3',
    }

    return (
      <Component
        {...rest}
        ref={ref}
        className={twMerge(
          'h-10 px-2 py-2 border-none last:pr-6',
          spacingClasses[spacing],
          isHead && 'text-left',
          className
        )}
        style={style}
        colSpan={colSpan}
        rowSpan={rowSpan}
      >
        {adornment ? (
          <div className='flex items-center'>
            {tooltipWithChildren}
            {adornment}
          </div>
        ) : (
          tooltipWithChildren
        )}
      </Component>
    )
  }
)

TableCell.defaultProps = {
  align: 'inherit',
}

TableCell.displayName = 'TableCell'

export default TableCell
