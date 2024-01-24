import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'
import { SPACING_2 } from '@toptal/picasso/utils'

import { queryBuilderGlobalStyles } from './query-builder-global-styles'

type Root = {
  maxGroupDepth: number
  theme: Theme
}

const getRuleGroupBackgroundColor = ({ maxGroupDepth, theme }: Root) => {
  return Array.from({ length: maxGroupDepth }, (_, index) => index + 1).reduce(
    (acc, index) => {
      const isOdd = index % 2 !== 0
      const key = `&[data-level='${index}']`

      return {
        ...acc,
        [key]: {
          backgroundColor: isOdd
            ? theme.palette.common.white
            : theme.palette.grey.lightest,
        },
      }
    },
    {}
  )
}

const globalStyles = queryBuilderGlobalStyles()

export default (theme: Theme) =>
  createStyles({
    global: {
      ...globalStyles,
    },
    root: {
      borderRadius: '0.5em',
      background: theme.palette.grey.lighter,

      '& .rule-group': {
        // getting maxGroupDepth from props caused problems in jss,
        // so hard coded 10 max group depth which is unlikely to be topped.
        ...getRuleGroupBackgroundColor({ maxGroupDepth: 10, theme }),
      },

      '& .query-builder-branches': {
        '& .rule-group[data-level="1"], .rule[data-level="1"], .rule[data-level="2"], .rule-group[data-level="2"]':
          {
            '&:before, &:after': {
              borderColor: theme.palette.blue.main,
              content: '""',
            },
          },
      },

      '& .rule-group[data-level="0"]': {
        '& > .rule-group-header': {
          '& .rule-group-combinator': {
            order: 0,
          },

          '& .rule-group-add-group': {
            order: 1,
          },

          '& .rule-group-add-rule': {
            order: 2,
          },
        },
      },

      '& .rule-group-body': {
        '& .rule-group-header': {
          '& .rule-group-combinator': {
            order: 0,
          },

          '& .rule-group-remove': {
            order: 1,
          },

          '& .rule-group-duplicate': {
            order: 2,
          },

          '& .rule-group-add-group': {
            order: 3,
          },

          '& .rule-group-add-rule': {
            order: 4,
          },
        },
      },

      '& .rule-group-header': {
        justifyContent: 'flex-end',
      },

      '& .rule button, .rule-group-header button': {
        margin: 0,
      },
    },
    supportButton: {
      position: 'absolute',
      top: `${SPACING_2}rem`,
      right: `${SPACING_2}rem`,
    },
  })
