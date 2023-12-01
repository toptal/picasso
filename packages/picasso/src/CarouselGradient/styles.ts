/* eslint-disable import/no-extraneous-dependencies */
import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    gradient: {
      position: 'absolute',
      height: '100%',
      top: 0,
    },
    nextGradient: {
      right: 0,
      background:
        'linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, white 95%)',
    },
    prevGradient: {
      left: 0,
      background:
        'linear-gradient(90deg, white 5%, rgba(255, 255, 255, 0.2) 100%)',
    },
  })
