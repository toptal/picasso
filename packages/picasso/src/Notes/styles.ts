import { PicassoProvider } from '@toptal/picasso-provider'
import { Theme, createStyles } from '@material-ui/core/styles'

PicassoProvider.override(({ palette }: Theme) => ({

}))

export default ({ palette }: Theme) => createStyles({
})
