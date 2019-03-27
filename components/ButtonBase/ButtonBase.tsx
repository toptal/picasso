import React from 'react'
import MUIButtonBase, { ButtonBaseProps } from '@material-ui/core/ButtonBase'

import './styles'

const ButtonBase: React.FunctionComponent<ButtonBaseProps> = props => {
  return <MUIButtonBase {...props} />
}

export default ButtonBase
