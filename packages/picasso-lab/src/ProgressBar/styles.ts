import { Theme, createStyles } from '@material-ui/core/styles'
import { rem } from '@toptal/picasso-shared'

export default ({ palette, sizes }: Theme) =>
  createStyles({
    progressBar: {
      width: '100%',
      height: '0.5rem',
      background: palette.grey.light,
      borderRadius: sizes.borderRadius.small
    },
    progressIndicator: (props: { value: number }) => ({
      width: `${props.value}%`,
      height: '0.5rem',
      borderRadius: sizes.borderRadius.small,
      background: palette.blue.light,
      transition: 'width 0.3s ease-in-out'
    }),
    percentageValue: {
      minWidth: rem('29px'),
      marginLeft: '0.5em',
      lineHeight: rem('18px')
    }
  })
