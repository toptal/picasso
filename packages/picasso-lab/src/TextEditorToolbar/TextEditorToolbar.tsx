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

type Props = {
  id: string
  formatState: {
    header: '3' | ''
    bold: boolean
    italic: boolean
    list: false | 'bullet' | 'ordered'
  }
  handlers: {
    handleHeader?: (event: React.ChangeEvent<{ value: '3' | '' }>) => void
    handleBold?: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleItalic?: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleUnordered?: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleOrdered?: (e: React.MouseEvent<HTMLButtonElement>) => void
  }
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorToolbar'
})

export const TextEditorToolbar = (props: Props) => {
  const { id, formatState, handlers, disabled } = props

  const classes = useStyles(props)

  return (
    <Container id={`${id}toolbar`} className={classes.toolbar}>
      <Container className={classes.group}>
        <Select
          onChange={handlers.handleHeader}
          value={formatState.header}
          options={[
            { value: '3', text: 'heading' },
            { value: '', text: 'normal' }
          ]}
          size='small'
          menuWidth='123px'
          className={classes.select}
          disabled={disabled}
        />
      </Container>
      <Container className={classes.group}>
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
      <Container className={classes.group}>
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
