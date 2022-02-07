import React, { ReactElement } from 'react'
import cx from 'classnames'
import { BaseProps, Button } from '@toptal/picasso'
import { makeStyles, Theme } from '@material-ui/core'

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
  index: 10
})

const TextEditorButton = (props: Props) => {
  const { icon, onClick, active, className, style, disabled, ...rest } = props
  const classes = useStyles(props)

  return (
    <Button.Circular
      variant='flat'
      onClick={onClick}
      icon={icon}
      style={style}
      className={cx(
        classes.button,
        {
          [classes.activeButton]: active
        },
        className
      )}
      disabled={disabled}
      {...rest}
    />
  )
}

TextEditorButton.defaultProps = {
  active: false,
  disabled: false,
  onClick: () => {}
}

TextEditorButton.displayName = 'TextEditorButton'

export default TextEditorButton
