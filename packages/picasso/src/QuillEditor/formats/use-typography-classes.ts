import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import typographyStyles from '../../Typography/styles'

const useTypographyClasses = makeStyles<Theme>(typographyStyles, {
  name: 'TextEditorTypography',
})

export default useTypographyClasses
