/* eslint-disable complexity */

import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { PropTypes } from '@material-ui/core'
import cx from 'classnames'
import {
  StandardProps,
  SpacingType,
  spacingToRem
} from '@toptal/picasso-shared'

import styles, {
  AlignItemsType,
  JustifyContentType,
  VariantType
} from './styles'
import kebabToCamelCase from '../utils/kebab-to-camel-case'

type ContainerType = 'div' | 'span'

type DirectionType = 'row' | 'column'

type BorderableType = 'transparent' | 'white'

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'PicassoContainer'
})

export interface Props<V extends VariantType = VariantType>
  extends StandardProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  /** Content of Container */
  children: ReactNode
  /** margin-top for the container transformed to `rem` */
  top?: SpacingType
  /** margin-bottom for the container transformed to `rem` */
  bottom?: SpacingType
  /** margin-left for the container transformed to `rem` */
  left?: SpacingType
  /** margin-right for the container transformed to `rem` */
  right?: SpacingType
  /** padding for the container transformed to `rem` */
  padded?: SpacingType
  /** Whether container should act as inline element `display: inline-block` */
  inline?: boolean
  /** Use flexbox */
  flex?: boolean
  /** Set flex direction */
  direction?: DirectionType
  /** Defines the align-items style property */
  alignItems?: AlignItemsType
  /** Defines the justify-content style property */
  justifyContent?: JustifyContentType
  /** Whether (`white`, `transparent` ) container has border or not */
  bordered?: V extends BorderableType ? boolean : never
  /** Whether container has 8px border-radius applied or not */
  rounded?: boolean
  /** Style variant of Notification */
  variant?: V
  /** Gap between elements for a flex container */
  gap?: SpacingType
  /** Component used for the root node */
  as?: ContainerType
  /** Text align of the inner text */
  align?: PropTypes.Alignment
}

/**
 * Container component used for spacing 2 elements
 */
export const Container = forwardRef<HTMLDivElement, Props>(function Container(
  props,
  ref
) {
  const {
    children,
    className,
    top,
    bottom,
    left,
    right,
    padded,
    inline,
    flex,
    direction,
    alignItems,
    justifyContent,
    style,
    bordered = false,
    rounded = false,
    variant,
    align,
    gap,
    as: Component = inline ? 'span' : 'div',
    // Avoid passing external classes inside the rest props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: externalClasses,
    ...rest
  } = props

  const classes = useStyles(props)

  const margins = {
    ...(typeof top === 'number' && { marginTop: spacingToRem(top) }),
    ...(typeof bottom === 'number' && { marginBottom: spacingToRem(bottom) }),
    ...(typeof left === 'number' && { marginLeft: spacingToRem(left) }),
    ...(typeof right === 'number' && { marginRight: spacingToRem(right) })
  }

  return (
    <Component
      {...rest}
      ref={ref}
      className={cx(
        classes[`${variant}Variant`],
        {
          [classes[`${padded}Padding`]]: typeof padded === 'string',
          [classes[`${gap}Gap`]]: typeof gap === 'string',

          [classes[`top${top}Margin`]]: typeof top === 'string',
          [classes[`bottom${bottom}Margin`]]: typeof bottom === 'string',
          [classes[`left${left}Margin`]]: typeof left === 'string',
          [classes[`right${right}Margin`]]: typeof right === 'string',

          [classes[`${align}TextAlign`]]: typeof align === 'string',

          [classes[
            `${kebabToCamelCase(alignItems || '')}AlignItems`
          ]]: alignItems,

          [classes[
            `${kebabToCamelCase(justifyContent || '')}JustifyContent`
          ]]: justifyContent,

          [classes.bordered]: bordered,
          [classes.rounded]: rounded,
          [classes.flex]: flex,
          [classes.inline]: inline,
          [classes.column]: direction === 'column'
        },
        className
      )}
      style={{
        ...margins,
        ...(typeof padded === 'number' && { padding: spacingToRem(padded) }),
        ...(typeof gap === 'number' && { gap: spacingToRem(gap) }),
        ...style
      }}
    >
      {children}
    </Component>
  )
})

Container.displayName = 'Container'

Container.defaultProps = {
  as: 'div',
  inline: false
}

export default Container
export { VariantType, BorderableType }
