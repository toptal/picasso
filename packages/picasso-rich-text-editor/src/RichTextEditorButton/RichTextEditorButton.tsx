import type { ReactElement } from 'react'
import React from 'react'
import cx from 'classnames'
import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import type { BaseProps } from '@toptal/picasso-shared'
import { ButtonCircular } from '@toptal/picasso-button'

import styles from './styles'

type Props = BaseProps & {
  active: boolean
  disabled: boolean
  icon: ReactElement
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  id?: string
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
