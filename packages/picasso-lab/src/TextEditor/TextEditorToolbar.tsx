import React from 'react'
import { Container, Select } from '@toptal/picasso'
import {
  Bold16,
  Italic16,
  ListOrdered16,
  ListUnordered16
} from '@toptal/picasso/Icon'
import { makeStyles, Theme } from '@material-ui/core'

import styles from './styles'
import TextEditorButton from '../TextEditorButton'
import { ToolbarHandlers, ToolbarStateType } from './store/toolbar/types'

type Props = {
  id: string
  formatState: ToolbarStateType['format']
  handlers: ToolbarHandlers
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorToolbar',
  index: 10
})

export const TextEditorToolbar = (props: Props) => {
  const { id, formatState, handlers, disabled } = props

  const classes = useStyles()

  return (
    <Container id={`${id}toolbar`} className={classes.qlToolbar}>
      <Container className={classes.qlFormats}>
        <Select
          onChange={handlers.handleHeader}
          value={formatState.header}
          options={[
            { value: '3', text: 'heading' },
            { value: '', text: 'normal' }
          ]}
          size='small'
          menuWidth='123px'
          className={classes.textStylesSelect}
          disabled={disabled}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <TextEditorButton
          icon={<Bold16 />}
          onClick={handlers.handleBold}
          active={formatState.bold}
          disabled={disabled}
        />
        <TextEditorButton
          icon={<Italic16 />}
          onClick={handlers.handleItalic}
          active={formatState.italic}
          disabled={disabled}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <TextEditorButton
          icon={<ListUnordered16 />}
          onClick={handlers.handleUnordered}
          active={formatState.list === 'bullet'}
          disabled={disabled}
        />
        <TextEditorButton
          icon={<ListOrdered16 />}
          onClick={handlers.handleOrdered}
          active={formatState.list === 'ordered'}
          disabled={disabled}
        />
      </Container>
    </Container>
  )
}

TextEditorToolbar.displayName = 'TextEditorToolbar'

export default TextEditorToolbar
