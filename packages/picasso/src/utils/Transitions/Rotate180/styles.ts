import createStyles from '@mui/styles/createStyles'

export default () =>
  createStyles({
    transition: {
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    rotate180: {
      transform: 'rotate(180deg)'
    }
  })
