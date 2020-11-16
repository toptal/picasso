import { createStyles } from '@material-ui/core/styles'

export default () =>
  createStyles({
    hideBottomYAxisLabel: {
      '& .recharts-yAxis .recharts-cartesian-axis-tick:first-child': {
        display: 'none'
      }
    }
  })
