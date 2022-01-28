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
import { ToolbarHandlers, ToolbarStateType } from './types'
import TextEditorButton from './TextEditorButton'

type Props = {
  id: string
  state?: ToolbarStateType
  handlers?: ToolbarHandlers
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorToolbar',
  index: 10
})

export const TextEditorToolbar = (props: Props) => {
  const { id, state, handlers, disabled, quill } = props

  const isNotInitialized = !state && !handlers

  const classes = useStyles()

  return (
    <Container id={`${id}toolbar`} className={classes.qlToolbar}>

      <Container className={classes.qlFormats}>
        <Select
          onChange={handlers?.handleHeader}
          value={state?.header}
          options={[
            { value: '3', text: 'heading' },
            { value: '', text: 'normal' }
          ]}
          size='small'
          menuWidth='123px'
          className={classes.textStylesSelect}
          disabled={disabled || isNotInitialized}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <TextEditorButton
          icon={<Bold16 />}
          onClick={handlers?.handleBold}
          active={state?.bold}
          disabled={disabled || isNotInitialized}
        />
        <TextEditorButton
          icon={<Italic16 />}
          onClick={handlers?.handleItalic}
          active={state?.italic}
          disabled={disabled || isNotInitialized}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <TextEditorButton
          icon={<ListUnordered16 />}
          onClick={handlers?.handleUnordered}
          active={state?.list === 'bullet'}
          disabled={disabled || isNotInitialized}
        />
        <TextEditorButton
          icon={<ListOrdered16 />}
          onClick={handlers?.handleOrdered}
          active={state?.list === 'ordered'}
          disabled={disabled || isNotInitialized}
        />
      </Container>
    </Container>
  )
}

TextEditorToolbar.displayName = 'TextEditorToolbar'

export default TextEditorToolbar
