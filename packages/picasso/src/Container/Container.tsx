/* eslint-disable complexity */

import React, { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import cx from 'classnames'
import {
  StandardProps,
  SpacingType,
  spacingToRem,
  mergeClasses
} from '@toptal/picasso-shared'

import styles, { AlignItemsType, JustifyContentType } from './styles'
import kebabToCamelCase from '../utils/kebab-to-camel-case'

type ContainerType = 'div' | 'span'

type DirectionType = 'row' | 'column'

export type VariantType = 'red' | 'green' | 'white' | 'yellow' | 'blue' | 'grey'

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoContainer' })

export interface Props
  extends StandardProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  /** Content of Container */
  children: ReactNode
  /** margin-top for the container transformed to `em` */
  top?: SpacingType
  /** margin-bottom for the container transformed to `em` */
  bottom?: SpacingType
  /** margin-left for the container transformed to `em` */
  left?: SpacingType
  /** margin-right for the container transformed to `em` */
  right?: SpacingType
  /** padding for the container transformed to `em` */
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
  /** Whether container has border or not */
  bordered?: boolean
  /** Whether container has 8px border-radius applied or not */
  rounded?: boolean
  /** Style variant of Notification */
  variant?: VariantType
  /** Component used for the root node */
  as?: ContainerType
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
    classes: externalClasses,
    as: Component = inline ? 'span' : 'div',
    ...rest
  } = props

  const classes = mergeClasses(useStyles(props), externalClasses)

  const margins = {
    ...(typeof top === 'number' && { marginTop: spacingToRem(top) }),
    ...(typeof bottom === 'number' && { marginBottom: spacingToRem(bottom) }),
    ...(typeof left === 'number' && { marginLeft: spacingToRem(left) }),
    ...(typeof right === 'number' && { marginRight: spacingToRem(right) })
  }

  return (
    <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      className={cx(
        classes[`${variant}Variant`],
        {
          [classes[`${padded}Padding`]]: typeof padded === 'string',

          [classes[`top${top}Margin`]]: typeof top === 'string',
          [classes[`bottom${bottom}Margin`]]: typeof bottom === 'string',
          [classes[`left${left}Margin`]]: typeof left === 'string',
          [classes[`right${right}Margin`]]: typeof right === 'string',

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
