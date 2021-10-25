import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      // TODO: generalize in MenuItem (BASE should update all the disabled colors to the one format)
      '&$disabled': {
        color: palette.grey.main2
      }
    },
    disabled: {}
  })
