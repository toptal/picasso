/* eslint-disable complexity */

import React, { HTMLAttributes, forwardRef, ReactElement } from 'react'
import {
  CompoundedComponentWithRef,
  BaseProps,
  useBreakpoint
} from '@toptal/picasso-shared'
import Grid from '@toptal/picasso/Grid'
import { GridSize } from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import cx from 'classnames'

import DetailedListItem, { DetailedListItemProps } from '../DetailedListItem'
import styles from './styles'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** List items */
  children: ReactElement<DetailedListItemProps>[]
  /** Colors every second row */
  stripped?: boolean
}

interface StaticProps {
  Item: typeof DetailedListItem
}

const generateSequence = (length: number) => Array.from(Array(length).keys())

interface RenderChildArguments {
  child: Props['children'][0]
  gridSize: GridSize
  ratio?: DetailedListItemProps['ratio']
}

const renderChild = ({ child, gridSize, ratio }: RenderChildArguments) => {
  return (
    <Grid.Item small={12} medium={gridSize}>
      {React.cloneElement(child, {
        ...child.props,
        ratio
      })}
    </Grid.Item>
  )
}

const useStyles = makeStyles(styles, { name: 'DetailedList' })

export const DetailedList = forwardRef<HTMLDivElement, Props>(
  function DetailedList(props, ref) {
    const { children, stripped, className, ...rest } = props

    const isSmall = useBreakpoint('small')

    const classes = useStyles()

    const childrenArray = React.Children.toArray(children)
    const rowsCount = isSmall
      ? childrenArray.length
      : Math.round(childrenArray.length / 2)

    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        ref={ref}
        className={cx(
          className,
          classes.root,
          stripped ? classes.stripped : undefined
        )}
      >
        {generateSequence(rowsCount).map(index => {
          const child = childrenArray[index * 2]
          const nextChild = childrenArray[index * 2 + 1]
          const isLastRow = index === rowsCount - 1
          const ratio = !nextChild && isLastRow && !isSmall ? 'quarter' : 'half'

          return (
            <Grid className={classes.row} key={index} spacing={0}>
              {renderChild({
                child,
                gridSize: !nextChild && isLastRow ? 12 : 6,
                ratio
              })}
              {nextChild &&
                renderChild({
                  child: nextChild,
                  gridSize: 6
                })}
            </Grid>
          )
        })}
      </div>
    )
  }
) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

DetailedList.defaultProps = {}
DetailedList.displayName = 'DetailedList'

DetailedList.Item = DetailedListItem

export default DetailedList
