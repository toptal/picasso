import { SizeType } from '@toptal/picasso-shared'
import { createStyles, Theme } from '@material-ui/core/styles'

import { Status } from '../OutlinedInput'

const SETTINGS = {
  small: {
    dimensions: '5em',
  },
  large: {
    dimensions: '10em',
  },
} as const

interface Props {
  size?: SizeType<'small' | 'large'>
  src?: string
  status?: Extract<Status, 'error' | 'default'>
  focused?: boolean
}

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: palette.blue.main,
      outline: 'none',

      '&$error': {
        color: palette.red.main,
      },
    },

    size: ({ size = 'small' }: Props) => {
      const { dimensions } = SETTINGS[size]

      return {
        width: dimensions,
        height: dimensions,
      }
    },

    icon: {
      position: 'absolute',
      zIndex: 1,
      cursor: 'pointer',
    },

    error: {},
  })
