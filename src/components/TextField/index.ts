import Input from '../Input'
import withDeprecationWarning from '../utils/with-deprecation-warning'

// TextField component is deprecated and
// have to be removed in v4 of Picasso
export default withDeprecationWarning('TextField', 'Input')(Input)
