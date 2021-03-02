import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ screens, layout }: Theme) =>
  createStyles({
    root: {
      flex: 1,
      margin: `0 ${layout.contentPaddingHorizontal}`,

      [screens('small', 'medium')]: {
        margin: `0 ${layout.contentMobilePaddingHorizontal}`
      }
    }
  })
