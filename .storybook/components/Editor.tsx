import React from 'react'
import AceEditor from 'react-ace'
import 'brace/ext/language_tools'
import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/twilight'

interface Props {
  id: string
  mode: 'html' | 'jsx'
  value: string
  onChange: (value: string, event?: any) => void
}

const Editor: React.FunctionComponent<Props> = props => {
  const { id, mode, value, ...rest } = props

  return (
    <AceEditor
      name={id}
      mode={mode}
      theme="twilight"
      width="100%"
      height="100px"
      value={value}
      enableBasicAutocompletion
      enableLiveAutocompletion
      editorProps={{ $blockScrolling: Infinity }}
      highlightActiveLine={false}
      maxLines={Infinity}
      showGutter={true}
      showPrintMargin={false}
      tabSize={2}
      {...rest}
    />
  )
}

Editor.defaultProps = {
  mode: 'jsx'
}

export default Editor
