import { Theme, createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

import { Props } from './Tabs'

PicassoProvider.override(({ palette }: Theme) => ({
  MuiTabs: {
    root: {
      position: 'relative',
      minHeight: 0,
      '&::after': {
        position: 'absolute',
        content: '""',
        bottom: 0,
        left: (props: Props) =>
          props.orientation === 'vertical' ? undefined : 0,
        right: 0,
        width: (props: Props) =>
          props.orientation === 'vertical' ? 1 : undefined,
        height: (props: Props) =>
          props.orientation === 'vertical' ? '100%' : 1,
        backgroundColor: palette.grey.main,
        zIndex: 0
      }
    },
    indicator: {
      backgroundColor: palette.blue.main,
      zIndex: 1
    }
  }
}))

export default () => createStyles({})
