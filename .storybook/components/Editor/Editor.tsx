import React, { FunctionComponent } from 'react'
import AceEditor from 'react-ace'
import { withStyles } from '@material-ui/core/styles'
import 'brace/ext/language_tools'
import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/twilight'

import styles from './styles'
import { Classes } from '../../../packages/shared'

interface Props {
  id: string
  mode: 'html' | 'jsx'
  value: string
  classes: Classes
  onChange: (value: string) => void
}

const Editor: FunctionComponent<Props> = props => {
  const { id, mode, value, classes, ...rest } = props

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

Editor.defaultProps = {
  mode: 'jsx'
}

export default withStyles(styles)(Editor)
