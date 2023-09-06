/* eslint-disable complexity */

import type { ReactNode, HTMLAttributes, Ref, ReactElement } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { PropTypes } from '@material-ui/core'
import cx from 'classnames'
import type { StandardProps, PicassoSpacing } from '@toptal/picasso-shared'
import { spacingToRem, isNumericSpacing } from '@toptal/picasso-shared'
import type { DeprecatedSpacingType } from '@toptal/picasso-provider/Picasso/config/spacings'

import type { AlignItemsType, JustifyContentType, VariantType } from './styles'
import styles from './styles'
import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { forwardRef, documentable } from '../utils/forward-ref'

type ContainerType = 'div' | 'span'

type DirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse'

type BorderableType = 'transparent' | 'white'

const useStyles = makeStyles<
  Theme,
  CustomContainerTypeNormal | CustomContainerTypeDeprecated
>(styles, {
  name: 'PicassoContainer',
})

interface InternalProps<V extends VariantType = VariantType>
  extends StandardProps,
    HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  /** Content of Container */
  children?: ReactNode

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
  /** Whether (`white`, `transparent`) container has border or not */
  bordered?: V extends BorderableType ? boolean : never
  /** Whether container has 8px border-radius applied or not */
  rounded?: boolean
  /** Style variant of Notification */
  variant?: V
  /** Component used for the root node */
  as?: ContainerType
  /** Text align of the inner text */
  align?: PropTypes.Alignment
}

type CustomContainerTypeNormal<V extends VariantType = VariantType> =
  InternalProps<V> & {
    /** margin-top for the container transformed to `rem` */
    top?: PicassoSpacing
    /** margin-bottom for the container transformed to `rem` */
    bottom?: PicassoSpacing
    /** margin-left for the container transformed to `rem` */
    left?: PicassoSpacing
    /** margin-right for the container transformed to `rem` */
    right?: PicassoSpacing
    /** padding for the container transformed to `rem` */
    padded?: PicassoSpacing
    /** Gap between elements for a flex container */
    gap?: PicassoSpacing
  }

/** @deprecated */
type CustomContainerTypeDeprecated<V extends VariantType = VariantType> =
  InternalProps<V> & {
    /** margin-top for the container transformed to `rem` */
    /** @deprecated */
    top?: DeprecatedSpacingType
    /** @deprecated */
    bottom?: DeprecatedSpacingType
    /** margin-left for the container transformed to `rem` */
    /** @deprecated */
    left?: DeprecatedSpacingType
    /** margin-right for the container transformed to `rem` */
    /** @deprecated */
    right?: DeprecatedSpacingType
    /** padding for the container transformed to `rem` */
    /** @deprecated */
    padded?: DeprecatedSpacingType
    /** Gap between elements for a flex container */
    /** @deprecated */
    gap?: DeprecatedSpacingType
  }

type ContainerProps = {
  <V extends VariantType = VariantType>(
    props: CustomContainerTypeNormal<V> & { ref?: Ref<HTMLDivElement> | null }
  ): ReactElement
  <V extends VariantType = VariantType>(
    props: CustomContainerTypeDeprecated<V> & {
      ref?: Ref<HTMLDivElement> | null
    }
  ): ReactElement
  displayName?: string
  defaultProps?: Partial<CustomContainerTypeNormal<VariantType>>
}

export type Props<V extends VariantType = VariantType> =
  | CustomContainerTypeNormal<V>
  | CustomContainerTypeDeprecated<V>

/**
 * Container component used for spacing 2 elements
 */
export const Container: ContainerProps = documentable(
  forwardRef<
    CustomContainerTypeNormal | CustomContainerTypeDeprecated,
    HTMLDivElement
  >(
    <V extends VariantType>(
      props: CustomContainerTypeNormal<V> | CustomContainerTypeDeprecated<V>,
      ref: Ref<HTMLDivElement> | null
    ) => {
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
        ...(isNumericSpacing(top) && { marginTop: spacingToRem(top) }),
        ...(isNumericSpacing(bottom) && {
          marginBottom: spacingToRem(bottom),
        }),
        ...(isNumericSpacing(left) && { marginLeft: spacingToRem(left) }),
        ...(isNumericSpacing(right) && { marginRight: spacingToRem(right) }),
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

              [classes[`${kebabToCamelCase(alignItems || '')}AlignItems`]]:
                alignItems,

              [classes[
                `${kebabToCamelCase(justifyContent || '')}JustifyContent`
              ]]: justifyContent,

              [classes.bordered]: bordered,
              [classes.rounded]: rounded,
              [classes.flex]: flex,
              [classes.inline]: inline,
              [classes[kebabToCamelCase(direction || '')]]:
                direction && direction !== 'row',
            },
            className
          )}
          style={{
            ...margins,
            ...(isNumericSpacing(padded) && {
              padding: spacingToRem(padded),
            }),
            ...(isNumericSpacing(gap) && { gap: spacingToRem(gap) }),
            ...style,
          }}
        >
          {children}
        </Component>
      )
    }
  ) as ContainerProps
)

Container.displayName = 'Container'

Container.defaultProps = {
  as: 'div',
  inline: false,
}

export default Container
export type { VariantType }
