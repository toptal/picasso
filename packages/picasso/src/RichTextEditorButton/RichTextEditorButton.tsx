import React, { ReactElement } from 'react'
import cx from 'classnames'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { BaseProps } from '@toptal/picasso-shared'

import ButtonCircular from '../ButtonCircular'
import styles from './styles'

type Props = BaseProps & {
  active: boolean
  disabled: boolean
  icon: ReactElement
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

// Using { index: 10 } to inject CSS generated classes after the button's classes
// in order to prevent Button's styles to override custom TextEditorButton styles
// Related Jira issue: https://toptal-core.atlassian.net/browse/FX-1520
const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorButton',
  index: 10,
})

const RichTextEditorButton = (props: Props) => {
  const { icon, onClick, active, className, style, disabled, ...rest } = props
  const classes = useStyles(props)

  return (
    <ButtonCircular
      variant='flat'
      onClick={onClick}
      icon={icon}
      style={style}
      className={cx(
        classes.button,
        {
          [classes.activeButton]: active,
        },
        className
      )}
      disabled={disabled}
      {...rest}
    />
  )
}

RichTextEditorButton.defaultProps = {
  active: false,
  disabled: false,
  onClick: () => {},
}

RichTextEditorButton.displayName = 'RichTextEditorButton'

export default RichTextEditorButton
