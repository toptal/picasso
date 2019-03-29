import { Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) => ({
  defaultSummary: {
    padding: '0 2.4em',
    color: palette.common.black,
    fontSize: '1.25em',
    fontWeight: 700
  },
  defaultDetails: {
    padding: '0 3em',
    lineHeight: '1.5em',
    color: palette.text.primary
  },
  expandIcon: {
    fontSize: '1.5em',
    color: palette.primary.main
  }
})
