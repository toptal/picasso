import type { Theme } from '@material-ui/core/styles'
import { createStyles } from '@material-ui/core/styles'

import { queryBuilderGlobalStyles } from './query-builder-global-styles'

type Root = {
  maxGroupDepth: number
  theme: Theme
}

const getRuleGroupBackgroundColor = ({ maxGroupDepth, theme }: Root) => {
  return Array.from({ length: maxGroupDepth }, (_, index) => index + 1).reduce(
    (acc, index) => {
      const isOdd = index % 2 !== 0
      const key = `& .rule-group[data-level='${index}']`

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

export default (theme: Theme) =>
  createStyles({
    global: {
      ...queryBuilderGlobalStyles(),
    },
    root: ({ maxGroupDepth }: { maxGroupDepth: number }) => ({
      borderRadius: '0.5em',
      background: theme.palette.grey.lighter,

      ...getRuleGroupBackgroundColor({ maxGroupDepth, theme }),

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
    }),
  })
