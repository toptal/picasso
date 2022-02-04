import React, { forwardRef } from 'react'
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
import { ButtonHandlerType, SelectOnChangeHandler } from './types'
import { FormatType } from '../TextEditor'

type Props = {
  disabled: boolean
  id: string
  format: FormatType
  onBoldClick: ButtonHandlerType
  onItalicClick: ButtonHandlerType
  onHeaderChange: SelectOnChangeHandler
  onUnorderedClick: ButtonHandlerType
  onOrderedClick: ButtonHandlerType
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorToolbar'
})

export const TextEditorToolbar = forwardRef<HTMLDivElement, Props>(
  function TextEditorToolbar(props: Props, ref) {
    const {
      disabled,
      id,
      format,
      onBoldClick,
      onItalicClick,
      onHeaderChange,
      onUnorderedClick,
      onOrderedClick
    } = props

    const classes = useStyles(props)

    return (
      <Container id={`${id}toolbar`} ref={ref} className={classes.toolbar}>
        <Container className={classes.group}>
          <Select
            onChange={onHeaderChange}
            value={format.header}
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
            onClick={onBoldClick}
            active={format.bold}
            disabled={disabled}
          />
          <TextEditorButton
            icon={<Italic16 />}
            onClick={onItalicClick}
            active={format.italic}
            disabled={disabled}
          />
        </Container>
        <Container className={classes.group}>
          <TextEditorButton
            icon={<ListUnordered16 />}
            onClick={onUnorderedClick}
            active={format.list === 'bullet'}
            disabled={disabled}
          />
          <TextEditorButton
            icon={<ListOrdered16 />}
            onClick={onOrderedClick}
            active={format.list === 'ordered'}
            disabled={disabled}
          />
        </Container>
      </Container>
    )
  }
)

TextEditorToolbar.defaultProps = {
  disabled: false,
  format: {
    bold: false,
    italic: false,
    list: false,
    header: ''
  },
  onBoldClick: () => {},
  onItalicClick: () => {},
  onHeaderChange: () => {},
  onUnorderedClick: () => {},
  onOrderedClick: () => {}
}

TextEditorToolbar.displayName = 'TextEditorToolbar'

export default TextEditorToolbar
