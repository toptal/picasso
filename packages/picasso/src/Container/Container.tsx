/* eslint-disable max-lines */

import React, { ReactNode, HTMLAttributes, Ref } from 'react'
import cx from 'classnames'
import {
  StandardProps,
  SpacingType,
  spacingToRem,
  OverridableComponent,
} from '@toptal/picasso-shared'
import { styled, SimplePaletteColorOptions } from '@mui/material/styles'
import { Color } from '@mui/material'
import { capitalize } from '@mui/material/utils'

import kebabToCamelCase from '../utils/kebab-to-camel-case'
import { forwardRef, documentable } from '../utils/forward-ref'

type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify'

type ContainerType = 'div' | 'span'

type DirectionType = 'row' | 'column'

type BorderableType = 'transparent' | 'white'

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
  /** Whether (`white`, `transparent`) container has border or not */
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
  align?: Alignment
}

/**
 * Container component used for spacing 2 elements
 */
export const Container = documentable(
  forwardRef(
    <V extends VariantType>(
      props: Props<V>,
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
        // as: Component = inline ? 'span' : 'div',
        // Avoid passing external classes inside the rest props
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        classes: externalClasses,
        ...rest
      } = props

      const margins = {
        ...(typeof top === 'number' && { marginTop: spacingToRem(top) }),
        ...(typeof bottom === 'number' && {
          marginBottom: spacingToRem(bottom),
        }),
        ...(typeof left === 'number' && { marginLeft: spacingToRem(left) }),
        ...(typeof right === 'number' && {
          marginRight: spacingToRem(right),
        }),
      }

      return (
        <StyledContainer
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
              [classes.column]: direction === 'column',
            },
            className
          )}
          style={{
            ...margins,
            ...(typeof padded === 'number' && {
              padding: spacingToRem(padded),
            }),
            ...(typeof gap === 'number' && { gap: spacingToRem(gap) }),
            ...style,
          }}
        >
          {children}
        </StyledContainer>
      )
    }
  )
)

Container.displayName = 'Container'

Container.defaultProps = {
  as: 'div',
  inline: false,
}

export default Container
export type { VariantType }

const textAlignVariants = [
  'inherit',
  'left',
  'center',
  'right',
  'justify',
] as const

const alignItemsVariants = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
] as const

const justifyContentVariants = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const

const directionVariants = ['top', 'left', 'bottom', 'right'] as const

const spacingVariants = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
] as const

const containerVariants = [
  'transparent',
  'red',
  'green',
  'white',
  'yellow',
  'blue',
  'grey',
] as const

type VariantType = typeof containerVariants[number]
type AlignItemsType = typeof alignItemsVariants[number]
type JustifyContentType = typeof justifyContentVariants[number]
type Direction = typeof directionVariants[number]
type Spacing = typeof spacingVariants[number]
type MapOfClasses = Record<string, Record<string, string>>

const PREFIX = 'PicassoContainer'

const getClasses = () => {
  const classKeysArray = ['bordered', 'rounded', 'flex', 'inline', 'column']

  containerVariants.forEach(variant => {
    classKeysArray.push(`${variant}Variant`)
  })

  spacingVariants.forEach(variant => {
    classKeysArray.push(`${variant}Padding`)
    classKeysArray.push(`${variant}Gap`)
    classKeysArray.push(`top${variant}Margin`)
    classKeysArray.push(`bottom${variant}Margin`)
    classKeysArray.push(`left${variant}Margin`)
    classKeysArray.push(`right${variant}Margin`)
  })

  textAlignVariants.forEach(variant => {
    classKeysArray.push(`${variant}TextAlign`)
  })

  alignItemsVariants.forEach(variant => {
    classKeysArray.push(`${kebabToCamelCase(variant)}AlignItems`)
  })

  justifyContentVariants.forEach(variant => {
    classKeysArray.push(`${kebabToCamelCase(variant)}JustifyContent`)
  })

  const result: Record<string, string> = {}

  classKeysArray.forEach(classKey => {
    result[classKey] = `${PREFIX}-${classKey}`
  })

  return result
}
const classes = getClasses()

const paddings = spacingVariants.reduce((acc, variant) => {
  acc[`&.${classes[`${variant}Padding`]}`] = {
    padding: spacingToRem(variant as SpacingType),
  }

  return acc
}, Object.create(null))

const gaps = spacingVariants.reduce((acc, variant) => {
  acc[`&.${classes[`${variant}Gap`]}`] = {
    gap: spacingToRem(variant as SpacingType),
  }

  return acc
}, Object.create(null))

const colorVariant = (colorOptions?: SimplePaletteColorOptions | Color) => {
  if (!colorOptions) {
    return {}
  }

  return {
    backgroundColor: colorOptions.lighter2 ?? colorOptions.lighter,
  }
}

const marginClassDef = (direction: Direction, spacing: Spacing) => ({
  [`margin${capitalize(direction)}`]: spacingToRem(spacing),
})

const marginClasses = (direction: Direction) => {
  return {
    [`&.${classes[`${direction}${'xsmall'}Margin`]}`]: marginClassDef(
      direction,
      'xsmall'
    ),
    [`&.${classes[`${direction}${'small'}Margin`]}`]: marginClassDef(
      direction,
      'small'
    ),
    [`&.${classes[`${direction}${'medium'}Margin`]}`]: marginClassDef(
      direction,
      'medium'
    ),
    [`&.${classes[`${direction}${'large'}Margin`]}`]: marginClassDef(
      direction,
      'large'
    ),
    [`&.${classes[`${direction}${'xlarge'}Margin`]}`]: marginClassDef(
      direction,
      'xlarge'
    ),
  }
}

const margins: MapOfClasses = {
  ...marginClasses('top'),
  ...marginClasses('left'),
  ...marginClasses('bottom'),
  ...marginClasses('right'),
}

const alignItems: MapOfClasses = {}

alignItemsVariants.forEach(variant => {
  alignItems[`&.${classes[`${kebabToCamelCase(variant)}AlignItems`]}`] = {
    alignItems: variant,
  }
})

const textAlignItems: MapOfClasses = {}

textAlignVariants.forEach(variant => {
  textAlignItems[`&.${classes[`${variant}TextAlign`]}`] = {
    textAlign: variant,
  }
})

const justifyContent: MapOfClasses = {}

justifyContentVariants.forEach(variant => {
  justifyContent[`&.${classes[`${kebabToCamelCase(variant)}JustifyContent`]}`] =
    {
      justifyContent: variant,
    }
})

const StyledContainer = styled('div')(({ theme }) => {
  const {
    palette,
    sizes: { borderRadius },
  } = theme

  return {
    [`&.${classes.bordered}`]: {
      border: `1px solid ${palette.grey.lighter2}`,
    },

    [`&.${classes.rounded}`]: {
      borderRadius: borderRadius.medium,
    },

    [`&.${classes.flex}`]: {
      display: 'flex',

      [`&.${classes.inline}`]: {
        display: 'inline-flex',
      },
    },

    [`&.${classes.column}`]: {
      flexDirection: 'column',
    },

    [`&.${classes.inline}`]: {
      display: 'inline-block',
    },

    [`&.${classes.whiteVariant}`]: {
      backgroundColor: palette.common.white,
    },

    [`&.${classes.redVariant}`]: colorVariant(palette.red),

    [`&.${classes.greenVariant}`]: colorVariant(palette.green),

    [`&.${classes.yellowVariant}`]: colorVariant(palette.yellow),

    [`&.${classes.blueVariant}`]: colorVariant(palette.blue),

    [`&.${classes.greyVariant}`]: colorVariant(palette.grey),

    ...paddings,
    ...margins,
    ...alignItems,
    ...justifyContent,
    ...textAlignItems,
    ...gaps,
  }
}) as OverridableComponent<Props>
