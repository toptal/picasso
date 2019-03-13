import { createStyles } from '@material-ui/core/styles'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiFormControl: {}
}))

export default () => createStyles({})
