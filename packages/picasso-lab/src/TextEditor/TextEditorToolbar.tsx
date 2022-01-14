import React from 'react'
import { Container, Button, Select } from '@toptal/picasso'
import {
  Bold16,
  Italic16,
  ListOrdered16,
  ListUnordered16
} from '@toptal/picasso/Icon'
import { makeStyles, Theme } from '@material-ui/core'

import styles from './styles'
import { ToolbarHandlers, ToolbarStateType } from './types'

type Props = {
  id: string
  state: ToolbarStateType
  handlers: ToolbarHandlers
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorToolbar',
  index: 10
})

export const TextEditorToolbar = (props: Props) => {
  const { id, state, handlers } = props

  const classes = useStyles()

  return (
    <Container id={`${id}toolbar`} className={classes.qlToolbar}>
      <Container className={classes.qlFormats}>
        <Select
          onChange={handlers.handleHeader}
          value={state.header}
          options={[
            { value: '3', text: 'heading' },
            { value: '', text: 'normal' }
          ]}
          size='small'
          menuWidth='123px'
          className={classes.textStylesSelect}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <Button.Circular
          variant='flat'
          icon={<Bold16 />}
          onClick={handlers.handleBold}
          active={state.bold}
        />
        <Button.Circular
          variant='flat'
          icon={<Italic16 />}
          onClick={handlers.handleItalic}
          active={state.italic}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <Button.Circular
          variant='flat'
          icon={<ListUnordered16 />}
          onClick={handlers.handleUnordered}
          active={state.list === 'bullet'}
        />
        <Button.Circular
          variant='flat'
          icon={<ListOrdered16 />}
          onClick={handlers.handleOrdered}
          active={state.list === 'ordered'}
        />
      </Container>
    </Container>
  )
}

TextEditorToolbar.displayName = 'TextEditorToolbar'

export default TextEditorToolbar
