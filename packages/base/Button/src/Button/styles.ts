import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { alpha, outline } from '@toptal/picasso-shared'
import { VariantType } from './Button'

const ICON_SPACING = '0.5em'

export const createOutlineCommons = ({ palette }: Theme) => ({
  color: palette.common.black,
  backgroundColor: palette.common.white,

  '&:hover, &$hovered': {
    borderColor: palette.common.black,
  },

  // when we use <Button as={Link} />
  '&&&:visited': {
    color: palette.common.black,
  },

  '&$disabled': {
    color: palette.grey.main,
    borderColor: palette.grey.main,
    backgroundColor: palette.common.white,
  },
})

export const activeGroup = ({ palette }: Theme) => ({
  backgroundColor: palette.grey.dark,
  borderColor: palette.grey.dark,
  color: palette.common.white,
})

export const disabledGroup = ({ palette }: Theme) => ({
  color: palette.grey.main,
  cursor: 'not-allowed',
  pointerEvents: 'all',
})

export const createVariant = (variant: VariantType, { disabled, focused, hovered, active }: { disabled?: boolean, focused?: boolean, hovered?: boolean, active?: boolean }): string[] => {
  const variantClassNames = []

  switch (variant) {
    case 'primary':
      variantClassNames.push('border-none')
      variantClassNames.push('text-white')
      variantClassNames.push('visited:text-white')


      if (disabled) {
        variantClassNames.push('bg-gray-400')
      } else {
        variantClassNames.push('hover:bg-[#4269D6]')
        variantClassNames.push('active:bg-[#1A41AB]')

        if (hovered) {
          variantClassNames.push('bg-[#4269D6]')
        } else if (active) {
          variantClassNames.push('bg-[#1A41AB]')
        } else {
          variantClassNames.push('bg-blue-500')
        }
      }
      
      break;
    case 'negative':
      variantClassNames.push('border-none')
      variantClassNames.push('text-white')
      variantClassNames.push('visited:text-white')

      if (disabled) {
        variantClassNames.push('bg-gray-400')
      } else {
        variantClassNames.push('hover:bg-[#DB466B]')
        variantClassNames.push('active:bg-[#B01F43]')

        if (hovered) {
          variantClassNames.push('bg-[#DB466B]')
        } else if (active) {
          variantClassNames.push('bg-[#B01F43]')
        } else {
          variantClassNames.push('bg-red-500')
        }
      }

      break;
    case 'positive':
      variantClassNames.push('border-none')
      variantClassNames.push('text-white')
      variantClassNames.push('visited:text-white')
      
      if (disabled) {
        variantClassNames.push('bg-gray-400')
      } else {
        variantClassNames.push('hover:bg-[#27D496]')
        variantClassNames.push('active:bg-[#00A96C]')

        if (hovered) {
          variantClassNames.push('bg-[#27D496]')
        } else if (active) {
          variantClassNames.push('bg-[#00A96C]')
        } else {
          variantClassNames.push('bg-green-500')
        }
      }
      break;
    case 'secondary':
      variantClassNames.push('border-solid')

      if (disabled) {
        variantClassNames.push('text-gray-500')
        variantClassNames.push('border-gray-500')
        variantClassNames.push('bg-white')
      } else {
        variantClassNames.push('text-black')

        variantClassNames.push('hover:border-black')
        variantClassNames.push('visited:text-black')
        
        variantClassNames.push('active:bg-gray-200')
        variantClassNames.push('active:border-black')

        if (hovered) {
          variantClassNames.push('border-black')
          variantClassNames.push('bg-white')
        } else if (active) {
          variantClassNames.push('border-black')
          variantClassNames.push('bg-gray-200')
        } else {
          variantClassNames.push('bg-white')
        }
      }

      break;
    case 'transparent':
      /**
       * color: palette.common.white,
      border: `solid ${sizes.borderWidth} ${alpha(palette.common.white, 0.32)}`,

      // when we use <Button as={Link} />
      '&&&:visited': {
        color: palette.common.white,
      },

      '&$focusVisible, &$focused': {
        ...outline(palette.common.white),
      },

      '&:hover, &$hovered': {
        borderColor: palette.common.white,
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.16),
        borderColor: palette.common.white,
      },

      '&$disabled': {
        color: alpha(palette.common.white, 0.32),
        borderColor: alpha(palette.common.white, 0.32),
        backgroundColor: 'initial',
      },
       */

      if (disabled) {

      } else {
        variantClassNames.push('text-white')
        variantClassNames.push('visited:text-white')
      }


      break;
  }

  // if (disabled) {
  //   variantClassNames.push('bg-gray-400')
  // }

  return variantClassNames
}

// export const createSecondaryVariant = ({ disabled, focused, hovered, active }: { disabled?: boolean, focused?: boolean, hovered?: boolean, active?: boolean }): string[] => {
//   const classNames = [
//     disabled ? 'text-gray-500' : 'text-black',
//     disabled ? 'bg-gray-500' : 'bg-white',
//     'hover:border-black',
//     'visited:text-black',
//     disabled ? 'border-gray-500' : '',
//     'border-solid',
//     'active:bg-gray-200',
//     'active:border-black',
//   ]

//   // if (disabled) {
//   //   classNames.push('text-gray-500')
//   //   classNames.push('border-gray-500')
//   //   classNames.push('bg-gray-500')
//   // }


//   return classNames
// }

export const createCoreClassNames = ({ disabled, focused, hovered, active }: { disabled?: boolean, focused?: boolean, hovered?: boolean, active?: boolean }): string[] => {
  /**
   * {
      position: 'relative',
      textTransform: 'none',
      
      borderRadius: sizes.borderRadius.small,

      border: `solid ${sizes.borderWidth} ${palette.grey.light2}`,
      fontSize: '1rem',

      transitionDuration: `${transitions.duration.short}ms`,
      transitionTimingFunction: transitions.easing.easeOut,
      transitionProperty: 'border, color, background',
      boxShadow: 'none',
      flexShrink: 0,

      '&$focusVisible, &$focused': {
        ...outline(palette.primary.main),
      },

      '&+&': {
        marginLeft: '1rem',
      },
    }
   */

  const classNames = [
    'inline-flex',
    'items-center',
    'justify-center',
    'select-none',
    'appearance-none',
    'no-underline',
    'm-0',
    'relative',
    'normal-case',
    'rounded-sm',
    'border',
    'border-gray-400',
    // 'text-lg', set font-size in sizeClassNames
    'transition-colors',
    'duration-350',
    'ease-out',
    'shadow-none',
    'shrink-0',
    'outline-none',
    '[&:not(:first-of-type)]:ml-4',
  ]

  if (disabled) {

  } else {
    classNames.push('cursor-pointer')
    classNames.push('focus:shadow-button')
    classNames.push('focus-visible:shadow-button')

    if (focused) {
      classNames.push('shadow-button')
    }
  }

  return classNames
}

export default (theme: Theme) => {
  const { palette, sizes } = theme

  return createStyles({
    // root: {
    //   position: 'relative',
    //   textTransform: 'none',
    //   borderRadius: sizes.borderRadius.small,
    //   border: `solid ${sizes.borderWidth} ${palette.grey.light2}`,
    //   fontSize: '1rem',
    //   transitionDuration: `${transitions.duration.short}ms`,
    //   transitionTimingFunction: transitions.easing.easeOut,
    //   transitionProperty: 'border, color, background',
    //   boxShadow: 'none',
    //   flexShrink: 0,

    //   '&$focusVisible, &$focused': {
    //     ...outline(palette.primary.main),
    //   },

    //   '&+&': {
    //     marginLeft: '1rem',
    //   },
    // },
    // content: {
    //   // lineHeight: '1.5em',
    //   // fontWeight: typography.fontWeights.semibold,
    //   // whiteSpace: 'nowrap',
    // },
    loader: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },

    // sizes
    small: {
      // minWidth: '3.5em',
      // height: '1.5em',
      // padding: '0 0.75em',

      // '& $content': {
      //   fontSize: typography.buttons.fontSizeSmall,
      //   lineHeight: typography.buttons.lineHeightSmall,
      // },

      '& $iconLeft': {
        marginLeft: '-0.125em',
      },

      '& $iconRight': {
        marginRight: '-0.125em',
      },
    },
    medium: {
      // minWidth: '4em',
      // height: '2em',
      // padding: '0 1em',

      // '& $content': {
      //   fontSize: typography.buttons.fontSizeMedium,
      //   lineHeight: typography.buttons.lineHeightMedium,
      // },

      '& $iconLeft': {
        marginLeft: '-0.25em',
      },

      '& $iconRight': {
        marginRight: '-0.25em',
      },
    },
    large: {
      // minWidth: '6em',
      // height: '3em',
      // padding: '0 2em',

      // '& $content': {
      //   fontSize: typography.buttons.fontSizeLarge,
      //   lineHeight: typography.buttons.lineHeightLarge,
      // },

      '& $iconLeft': {
        marginLeft: '-0.5em',
      },

      '& $iconRight': {
        marginRight: '-0.5em',
      },
    },

    // variants
    // primary: createVariant(palette.primary.main, theme),
    // negative: createVariant(palette.red.main, theme),
    // positive: createVariant(palette.green.main, theme),

    // secondary: {
    //   ...createOutlineCommons(theme),
    //   '&:active, &$active': {
    //     backgroundColor: palette.grey.lighter2,
    //     borderColor: palette.common.black,
    //   },
    // },

    transparent: {
      color: palette.common.white,
      border: `solid ${sizes.borderWidth} ${alpha(palette.common.white, 0.32)}`,

      // when we use <Button as={Link} />
      '&&&:visited': {
        color: palette.common.white,
      },

      '&$focusVisible, &$focused': {
        ...outline(palette.common.white),
      },

      '&:hover, &$hovered': {
        borderColor: palette.common.white,
      },

      '&:active, &$active': {
        backgroundColor: alpha(palette.common.white, 0.16),
        borderColor: palette.common.white,
      },

      '&$disabled': {
        color: alpha(palette.common.white, 0.32),
        borderColor: alpha(palette.common.white, 0.32),
        backgroundColor: 'initial',
      },
    },

    // Other props
    fullWidth: {
      width: '100%',
    },
    hovered: {},
    focused: {},
    active: {
      boxShadow: 'none',
    },
    disabled: {},
    focusVisible: {},

    // Child elements
    icon: {
      fontSize: '1.2em !important',
      flex: '1 1 0%', // IE11 fix
    },
    iconLeft: {
      marginRight: ICON_SPACING,
    },
    iconRight: {
      marginLeft: ICON_SPACING,
    },
    hidden: {
      opacity: 0,
    },
  })
}
