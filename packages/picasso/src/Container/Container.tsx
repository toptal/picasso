import type { PropTypes } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type {
  DeprecatedSpacingType,
  SpacingType,
} from '@toptal/picasso-provider'
import { makeResponsiveSpacingProps } from '@toptal/picasso-provider'
import type { StandardProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import type { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react'
import React from 'react'

import { documentable, forwardRef } from '../utils/forward-ref'
import kebabToCamelCase from '../utils/kebab-to-camel-case'
import type { AlignItemsType, JustifyContentType, VariantType } from './styles'
import styles from './styles'

type ContainerType = 'div' | 'span'

type DirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse'

type BorderableType = 'transparent' | 'white'

const useStyles = makeStyles<
  Theme,
  PropsWithBaseSpacing | PropsWithDeprecatedSpacing
>(styles, {
  name: 'PicassoContainer',
})

const filterStringValue = (value?: SpacingType) =>
  typeof value === 'string' ? undefined : value

const useResponsiveProps = makeResponsiveSpacingProps(
  [
    'margin-top',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'padding',
    'gap',
  ] as const,
  'PicassoContainer-Responsive'
)

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

type PropsWithBaseSpacing<V extends VariantType = VariantType> =
  InternalProps<V> & {
    /** margin-top for the container transformed to `rem` */
    top?: Exclude<SpacingType, DeprecatedSpacingType>
    /** margin-bottom for the container transformed to `rem` */
    bottom?: Exclude<SpacingType, DeprecatedSpacingType>
    /** margin-left for the container transformed to `rem` */
    left?: Exclude<SpacingType, DeprecatedSpacingType>
    /** margin-right for the container transformed to `rem` */
    right?: Exclude<SpacingType, DeprecatedSpacingType>
    /** padding for the container transformed to `rem` */
    padded?: Exclude<SpacingType, DeprecatedSpacingType>
    /** Gap between elements for a flex container */
    gap?: Exclude<SpacingType, DeprecatedSpacingType>
  }

/** @deprecated */
type PropsWithDeprecatedSpacing<V extends VariantType = VariantType> =
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
    props: PropsWithBaseSpacing<V> & { ref?: Ref<HTMLDivElement> | null }
  ): ReactElement
  <V extends VariantType = VariantType>(
    props: PropsWithDeprecatedSpacing<V> & {
      ref?: Ref<HTMLDivElement> | null
    }
  ): ReactElement
  displayName?: string
  defaultProps?: Partial<PropsWithBaseSpacing<VariantType>>
}

export type Props<V extends VariantType = VariantType> =
  | PropsWithBaseSpacing<V>
  | PropsWithDeprecatedSpacing<V>

/**
 * Container component used for spacing 2 elements
 */
export const Container: ContainerProps = documentable(
  forwardRef<PropsWithBaseSpacing | PropsWithDeprecatedSpacing, HTMLDivElement>(
    <V extends VariantType>(
      props: PropsWithBaseSpacing<V> | PropsWithDeprecatedSpacing<V>,
      ref: Ref<HTMLDivElement> | null
    ) => {
      const {
        children,
        className,
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
        as: Component = inline ? 'span' : 'div',
        top,
        bottom,
        left,
        right,
        padded,
        gap,
        // Avoid passing external classes inside the rest props
        /* eslint-disable @typescript-eslint/no-unused-vars */
        classes: externalClasses,
        /* eslint-enable */
        ...rest
      } = props

      const classes = useStyles(props)
      const { className: responsiveClasses, style: responsiveStyle } =
        useResponsiveProps({
          'margin-top': filterStringValue(top),
          'margin-bottom': filterStringValue(bottom),
          'margin-left': filterStringValue(left),
          'margin-right': filterStringValue(right),
          padding: filterStringValue(padded),
          gap: filterStringValue(gap),
        })

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
            responsiveClasses,
            className
          )}
          style={{ ...responsiveStyle, ...style }}
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
