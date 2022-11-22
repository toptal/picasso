import { Theme, createStyles } from '@material-ui/core/styles'

export default ({ screens }: Theme) =>
  createStyles({
    root: {
      display: 'flex',

      [screens('small', 'medium')]: {
        display: 'block',
      },
    },
  })
