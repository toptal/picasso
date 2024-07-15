/* eslint-disable complexity */
import type { PropTypes } from '@material-ui/core'
import type { SpacingType } from '@toptal/picasso-provider'
import type { StandardProps } from '@toptal/picasso-shared'
// import cx from 'classnames'
import type { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react'
import React from 'react'
import { documentable, forwardRef } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { AlignItemsType, JustifyContentType, VariantType } from './styles'
import { alignmentClasses, variantClassesByColor } from './styles'
import { getSpacingClasses, getSpacingStyles } from './utils'
// import {
//   filterOutStringAndPicassoSpacing,
//   getBaseSpacingClasses,
// } from './utils'

type ContainerType = 'div' | 'span'

type DirectionType = 'row' | 'column' | 'row-reverse' | 'column-reverse'

type BorderableType = 'transparent' | 'white'

// const useStyles = makeStyles<Theme, Props>(styles, {
//   name: 'PicassoContainer',
// })

// const useResponsiveProps = makeResponsiveSpacingProps(
//   [
//     'margin-top',
//     'margin-bottom',
//     'margin-left',
//     'margin-right',
//     'padding',
//     'gap',
//   ] as const,
//   'PicassoContainer-Responsive'
// )

export interface Props<V extends VariantType = VariantType>
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
  /** Gap between elements for a flex container */
  gap?: SpacingType
}

type ContainerProps = {
  <V extends VariantType = VariantType>(
    props: Props<V> & { ref?: Ref<HTMLDivElement> | null }
  ): ReactElement
  displayName?: string
  defaultProps?: Partial<Props<VariantType>>
}

/**
 * Container component used for spacing 2 elements
 */
export const Container: ContainerProps = documentable(
  forwardRef<Props, HTMLDivElement>(
    <V extends VariantType>(
      props: Props<V>,
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

      // const classes = useStyles(props)
      // const { className: responsiveClasses, style: responsiveStyle } =
      //   useResponsiveProps({
      //     'margin-top': filterOutStringAndPicassoSpacing(top),
      //     'margin-bottom': filterOutStringAndPicassoSpacing(bottom),
      //     'margin-left': filterOutStringAndPicassoSpacing(left),
      //     'margin-right': filterOutStringAndPicassoSpacing(right),
      //     padding: filterOutStringAndPicassoSpacing(padded),
      //     gap: filterOutStringAndPicassoSpacing(gap),
      //   })

      // <Container padded={SPACING_2} />

      // const baseSpacingClasses = getBaseSpacingClasses(
      //   { top, left, bottom, right, gap, padded },
      //   classes
      // )
      const spacingProps = { gap, padded, top, bottom, right, left }

      return (
        <Component
          {...rest}
          ref={ref}
          className=//     [classes[`bottom${bottom}Margin`]]: typeof bottom === 'string', //     [classes[`top${top}Margin`]]: typeof top === 'string', //     [classes[`${gap}Gap`]]: typeof gap === 'string', //     [classes[`${padded}Padding`]]: typeof padded === 'string', //   { //   classes[`${variant}Variant`], done // {cx(
          //     [classes[`left${left}Margin`]]: typeof left === 'string',
          //     [classes[`right${right}Margin`]]: typeof right === 'string',

          //     [classes[`${align}TextAlign`]]: typeof align === 'string',

          //     [classes[`${kebabToCamelCase(alignItems || '')}AlignItems`]]:
          //       alignItems,

          //     [classes[
          //       `${kebabToCamelCase(justifyContent || '')}JustifyContent`
          //     ]]: justifyContent,

          //     [classes.bordered]: bordered, done
          //     [classes.rounded]: rounded, done
          //     [classes.flex]: flex, done
          //     [classes.inline]: inline, done
          //     [classes[kebabToCamelCase(direction || '')]]:
          //       direction && direction !== 'row',
          //   }, done
          //   baseSpacingClasses,
          //   responsiveClasses,
          //   className
          // )}
          {twMerge(
            variant && variantClassesByColor[variant],
            getSpacingClasses(spacingProps),
            typeof align === 'string' && alignmentClasses.textAlign[align],

            alignItems && alignmentClasses.alignItems[alignItems],

            justifyContent && alignmentClasses.justifyContent[justifyContent],

            bordered && 'border-DEFAULT border-solid border-gray-200',
            rounded && 'rounded-md',
            flex ? (inline ? 'inline-flex' : 'flex') : '',
            inline && 'inline-block',
            direction &&
              direction !== 'row' &&
              alignmentClasses.direction[direction],
            className
          )}
          style={{
            // used for deprecated spacing props (typeof number)
            ...getSpacingStyles(spacingProps),
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
