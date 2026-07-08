import React, { FunctionComponent } from 'react'
import AceEditor from 'react-ace'
import { BaseProps } from '@toptal/picasso-shared'
import 'brace/ext/language_tools'
import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/twilight'

import * as classes from './styles'

interface Props extends BaseProps {
  id: string
  mode?: 'html' | 'jsx'
  value: string
  onChange: (value: string) => void
}

const Editor: FunctionComponent<Props> = ({
  mode = 'jsx',
  id,
  value,
  ...rest
}) => {
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

export default Editor
