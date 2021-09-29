import { createStyles, Theme } from '@material-ui/core/styles'

export default ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '2px',
      backgroundImage: `repeating-linear-gradient(0deg, ${palette.grey.main}, ${palette.grey.main} 3px, transparent 3px, transparent 5px, ${palette.grey.main} 5px)`,
      backgroundPosition: '0 0',
      backgroundRepeat: 'no-repeat'
    }
  })
