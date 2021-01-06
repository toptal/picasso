import React, { FunctionComponent } from 'react'
import AceEditor from 'react-ace'
import { StandardProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'
import 'brace/ext/language_tools'
import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/twilight'

import styles from './styles'

interface Props extends StandardProps {
  id: string
  mode: 'html' | 'jsx'
  value: string
  onChange: (value: string) => void
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoEditor' })

const Editor: FunctionComponent<Props> = props => {
  const { id, mode, value, ...rest } = props

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AceEditor
        name={id}
        mode={mode}
        theme='twilight'
        width='100%'
        height='100px'
        value={value}
        enableBasicAutocompletion
        enableLiveAutocompletion
        editorProps={{ $blockScrolling: Infinity }}
        highlightActiveLine={false}
        maxLines={Infinity}
        showGutter={true}
        showPrintMargin={false}
        tabSize={2}
        style={undefined}
        {...rest}
      />
    </div>
  )
}

Editor.displayName = 'Editor'

Editor.defaultProps = {
  mode: 'jsx'
}

export default Editor
