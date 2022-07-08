import React, { FunctionComponent } from 'react'
import AceEditor from 'react-ace'
import { BaseProps } from '@toptal/picasso-shared'
import { styled } from '@mui/material/styles'
import 'brace/ext/language_tools'
import 'brace/mode/jsx'
import 'brace/mode/html'
import 'brace/theme/twilight'

interface Props extends BaseProps {
  id: string
  mode: 'html' | 'jsx'
  value: string
  onChange: (value: string) => void
}

const StyledEditor = styled('div')(() => ({
  width: '100%',

  '& *': {
    fontFamily:
      "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace",
  },
}))

const Editor: FunctionComponent<Props> = props => {
  const { id, mode, value, ...rest } = props

  return (
    <StyledEditor>
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
    </StyledEditor>
  )
}

Editor.displayName = 'Editor'

Editor.defaultProps = {
  mode: 'jsx',
}

export default Editor
