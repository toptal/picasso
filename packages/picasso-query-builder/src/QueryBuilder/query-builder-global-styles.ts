/* eslint-disable */

/**
 * we moved the styles from react query builder library css file to styled components to fix problem
 * related to cdn caching issue causing an error in production.
 * Issue URL: https://toptal-core.atlassian.net/browse/ER-28394
 */
import { SPACING_2, SPACING_4, SPACING_6, palette } from '@toptal/picasso-provider'

// Basic
const rqbSpacing = `${SPACING_6}rem`
const rqbSmallSpacing = `${SPACING_4}rem`
const rqbWhiteBackgroundColor = palette.common.white
const rqbBorderColor = palette.grey.light2
const rqbBorderStyle = 'solid'
const rqbBorderRadius = '0.5rem'
const rqbBorderWidth = '0.0625rem'

// Drag-and-drop
const rqbDndSpacing = `${SPACING_2}rem`
const rqbDndHoverBorderBottomColor = palette.purple.main
const rqbDndHoverCopyBorderBottomColor = palette.green.lighter
const rqbDndHoverBorderBottomStyle = 'dashed'
const rqbDndHoverBorderBottomWidth = '0.125rem'

// Branches
const rqbBranchIndent = '0.75rem'
const rqbBranchRadius = '0'
const rqbBranchColorLight = palette.blue.light
const rqbBranchWidth = rqbBorderWidth
const rqbBranchStyle = rqbBorderStyle

export const queryBuilderGlobalStyles = () => ({
  '& .ruleGroup': {
    display: 'flex',
    flexDirection: 'column',
    gap: rqbSmallSpacing,
    padding: rqbSpacing,
    borderColor: rqbBorderColor,
    borderStyle: rqbBorderStyle,
    borderRadius: rqbBorderRadius,
    borderWidth: rqbBorderWidth,
    backgroundColor: rqbWhiteBackgroundColor,
    margin: '-1px',

    '& .ruleGroup-body': {
      display: 'flex',
      flexDirection: 'column',
      gap: rqbSmallSpacing,

      '&:empty': {
        display: 'none',
      },
    },

    '& .ruleGroup-header, .rule': {
      display: 'flex',
      gap: rqbSmallSpacing,
      alignItems: 'center',
    },

    '& .rule': {
      flexWrap: 'wrap',
      '& .rule-value': {
        '& .rule-value-list-item:not(:first-of-type)': {
          margineft: rqbSmallSpacing,
        },
      },
    },
  },

  /* Drag-and-drop */

  /* Hover styles */
  '& [data-inlinecombinators="disabled"]': {
    '& .dndOver': {
      '&.rule, &.ruleGroup-header': {
        borderBottomWidth: rqbDndHoverBorderBottomWidth,
        borderBottomStyle: rqbDndHoverBorderBottomStyle,
        borderBottomColor: rqbDndHoverBorderBottomColor,
        paddingBottom: rqbDndSpacing,

        '&.dndCopy': {
          borderBottomColor: rqbDndHoverCopyBorderBottomColor,
        },
      },
    },
  },

  '& [data-inlinecombinators="enabled"]': {
    '& .dndOver': {
      '&.rule:last-child, &.ruleGroup-header, &.rule + .betweenRules, &.betweenRules':
        {
          borderBottomWidth: rqbDndHoverBorderBottomWidth,
          borderBottomStyle: rqbDndHoverBorderBottomStyle,
          borderBottomColor: rqbDndHoverCopyBorderBottomColor,
          paddingBottom: rqbDndSpacing,

          '&.dndCopy': {
            borderBottomColor: rqbDndHoverCopyBorderBottomColor,
          },
        },
    },
  },

  /* Drag styles */
  '& .ruleGroup, .rule': {
    '&.dndDragging': {
      opacity: 0.5,
    },

    '& .queryBuilder-dragHandle': {
      cursor: 'move',
    },
  },

  '& [data-dnd="disabled"] .queryBuilder-dragHandle': {
    display: 'none',
  },

  /* Branches */
  '& .queryBuilder-branches': {
    '& .ruleGroup-body': {
      marginLeft: `calc(2 * ${rqbBranchIndent})`,
    },

    '& .rule, .ruleGroup .ruleGroup': {
      position: 'relative',

      '&::before, &::after': {
        content: '""',
        width: rqbBranchIndent,
        left: `-${rqbSmallSpacing}`,
        borderColor: rqbBranchColorLight,
        borderStyle: rqbBranchStyle,
        borderRadius: rqbBranchRadius,
        position: 'absolute',
      },

      '&::before': {
        content: '""',
        top: `-${rqbSmallSpacing}`,
        height: `calc(50% + ${rqbSmallSpacing})`,
        borderWidth: `0 0 ${rqbBranchWidth} ${rqbBranchWidth}`,
      },

      '&:last-child::before': {
        content: '""',
        borderBottomLeftRadius: 0,
      },

      '&::after': {
        content: '""',
        top: '50%',
        height: '50%',
        borderWidth: `0 0 0 ${rqbBranchWidth}`,
      },

      '&:last-child::after': {
        content: '""',
        display: 'none',
      },
    },

    '& .ruleGroup .ruleGroup': {
      padding: rqbSmallSpacing,

      '&::before, &::after': {
        content: '""',
        left: `calc(-${rqbSmallSpacing} - ${rqbBranchWidth})`,
      },

      '&::before': {
        content: '""',
        top: `calc(-${rqbSmallSpacing} - ${rqbBorderWidth})`,
        height: `calc(50% + ${rqbSmallSpacing} + ${rqbBorderWidth})`,
      },

      '&::after': {
        content: '""',
        height: `calc(50% + ${rqbBorderWidth})`,
      },
    },

    '& .betweenRules': {
      position: 'relative',

      '&::before': {
        content: '""',
        width: rqbBranchIndent,
        left: `calc(-${rqbBranchIndent} - ${rqbBranchWidth})`,
        borderColor: rqbBorderColor,
        borderStyle: rqbBranchStyle,
        borderRadius: rqbBranchRadius,
        position: 'absolute',
        top: rqbSmallSpacing,
        height: `calc(100% + ${rqbSmallSpacing})`,
        borderWidth: `0 0 0 ${rqbBranchWidth}`,
      },
    },
  },
})
