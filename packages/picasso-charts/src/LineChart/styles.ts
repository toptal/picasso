import createStyles from '@mui/styles/createStyles';

export default () =>
  createStyles({
    hideBottomYAxisLabel: {
      '& .recharts-yAxis .recharts-cartesian-axis-tick:first-child': {
        display: 'none',
      },
    },
  })
