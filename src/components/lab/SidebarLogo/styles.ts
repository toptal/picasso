import { PicassoProvider } from '../../Picasso'
import { Theme, createStyles } from '@material-ui/core/styles'

PicassoProvider.override(({ palette }: Theme) => ({}))

export default ({ palette }: Theme) => createStyles({})
