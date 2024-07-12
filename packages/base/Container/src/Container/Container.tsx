/* eslint-disable complexity */
import type { PropTypes } from '@material-ui/core'
import type { SpacingType } from '@toptal/picasso-provider'
import {
  isPicassoSpacing,
  isResponsiveSpacing,
  kebabToCamelCase,
  makeResponsiveSpacingProps,
} from '@toptal/picasso-provider'
import type { StandardProps } from '@toptal/picasso-shared'
// import cx from 'classnames'
import type { HTMLAttributes, ReactElement, ReactNode, Ref } from 'react'
import React from 'react'
import { documentable, forwardRef } from '@toptal/picasso-utils'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { AlignItemsType, JustifyContentType, VariantType } from './styles'
import {
  flexClassesByDirection,
  paddings,
  variantClassesByColor,
} from './styles'
import { filterOutStringAndPicassoSpacing } from './utils'
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

const SPACING_CLASSES = {
  base: {
    0: {
      gap: 'gap-0',
      padded: 'p-0',
      top: 'mt-0',
      bottom: 'mb-0',
      left: 'ml-0',
      right: 'mr-0',
    },
    1: {
      gap: 'gap-1',
      padded: 'p-1',
      top: 'mt-1',
      bottom: 'mb-1',
      left: 'ml-1',
      right: 'mr-1',
    },
    2: {
      gap: 'gap-2',
      padded: 'p-2',
      top: 'mt-2',
      bottom: 'mb-2',
      left: 'ml-2',
      right: 'mr-2',
    },
    3: {
      gap: 'gap-3',
      padded: 'p-3',
      top: 'mt-3',
      bottom: 'mb-3',
      left: 'ml-3',
      right: 'mr-3',
    },
    4: {
      gap: 'gap-4',
      padded: 'p-4',
      top: 'mt-4',
      bottom: 'mb-4',
      left: 'ml-4',
      right: 'mr-4',
    },
    6: {
      gap: 'gap-6',
      padded: 'p-6',
      top: 'mt-6',
      bottom: 'mb-6',
      left: 'ml-6',
      right: 'mr-6',
    },
    8: {
      gap: 'gap-8',
      padded: 'p-8',
      top: 'mt-8',
      bottom: 'mb-8',
      left: 'ml-8',
      right: 'mr-8',
    },
    10: {
      gap: 'gap-10',
      padded: 'p-10',
      top: 'mt-10',
      bottom: 'mb-10',
      left: 'ml-10',
      right: 'mr-10',
    },
    12: {
      gap: 'gap-12',
      padded: 'p-12',
      top: 'mt-12',
      bottom: 'mb-12',
      left: 'ml-12',
      right: 'mr-12',
    },
  },
  deprecated: {
    xsmall: {
      gap: 'gap-2',
      padded: 'p-2',
      top: 'mt-2',
      bottom: 'mb-2',
      left: 'ml-2',
      right: 'mr-2',
    },
    small: {
      gap: 'gap-4',
      padded: 'p-4',
      top: 'mt-4',
      bottom: 'mb-4',
      left: 'ml-4',
      right: 'mr-4',
    },
    medium: {
      gap: 'gap-6',
      padded: 'p-6',
      top: 'mt-6',
      bottom: 'mb-6',
      left: 'ml-6',
      right: 'mr-6',
    },
    large: {
      gap: 'gap-8',
      padded: 'p-8',
      top: 'mt-8',
      bottom: 'mb-8',
      left: 'ml-8',
      right: 'mr-8',
    },
    xlarge: {
      gap: 'gap-10',
      padded: 'p-10',
      top: 'mt-10',
      bottom: 'mb-10',
      left: 'ml-10',
      right: 'mr-10',
    },
  },
} as const

type GetGapClassProps = {
  gap?: SpacingType
  padded?: SpacingType
  top?: SpacingType
  bottom?: SpacingType
  right?: SpacingType
  left?: SpacingType
}

const getMappedClass = (spacing: SpacingType | undefined, type: keyof GetGapClassProps) => {
  if (!spacing || typeof spacing === 'number') {
    return
  }

  if (isPicassoSpacing(spacing)) {
    const { baseTokenIndex } = spacing

    return SPACING_CLASSES.base[baseTokenIndex][type] || ''
  }

  if (typeof spacing === 'string') {
    return SPACING_CLASSES.deprecated[spacing] || ''
  }

  if (isResponsiveSpacing(spacing)) {
    // TODO check if responsive
  }
}

const getSpacingClasses = ({
  gap,
  padded,
  top,
  bottom,
  right,
  left,
}: GetGapClassProps) => {
  return [
    getMappedClass(gap, 'gap'),
    getMappedClass(padded, 'padded'),
    getMappedClass(top, 'top'),
    getMappedClass(bottom, 'bottom'),
    getMappedClass(right, 'right'),
    getMappedClass(left, 'left'),
  ]
}

const getGapStyle = (gapSpacing?: SpacingType) => {
  if (!gapSpacing || typeof gapSpacing !== 'number') {
    return
  }

  return {
    gap: `${gapSpacing}rem`,
  }
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
      const { className: responsiveClasses, style: responsiveStyle } =
        useResponsiveProps({
          'margin-top': filterOutStringAndPicassoSpacing(top),
          'margin-bottom': filterOutStringAndPicassoSpacing(bottom),
          'margin-left': filterOutStringAndPicassoSpacing(left),
          'margin-right': filterOutStringAndPicassoSpacing(right),
          padding: filterOutStringAndPicassoSpacing(padded),
          gap: filterOutStringAndPicassoSpacing(gap),
        })

      // <Container padded={SPACING_2} />

      // const baseSpacingClasses = getBaseSpacingClasses(
      //   { top, left, bottom, right, gap, padded },
      //   classes
      // )

      return (
        <Component
          {...rest}
          ref={ref}
          className=//   { //   classes[`${variant}Variant`], done // {cx(
          //     [classes[`${padded}Padding`]]: typeof padded === 'string',
          //     [classes[`${gap}Gap`]]: typeof gap === 'string',

          //     [classes[`top${top}Margin`]]: typeof top === 'string',
          //     [classes[`bottom${bottom}Margin`]]: typeof bottom === 'string',
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
            getSpacingClasses({ gap, padded, top, bottom, right, left }),

            typeof padded == 'string' && paddings[`${padded}Padding`]?.padding,

            bordered && 'border-DEFAULT border-solid border-gray-200',
            rounded && 'rounded-md',
            flex ? (inline ? 'inline-flex' : 'flex') : '',
            inline && 'inline-block',
            direction &&
              direction !== 'row' &&
              flexClassesByDirection[kebabToCamelCase(direction)],
            // baseSpacingClasses,
            // responsiveClasses,
            className
          )}
          style={{
            ...getGapStyle(),
          }}
          // style={{ ...responsiveStyle, ...style }}
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
