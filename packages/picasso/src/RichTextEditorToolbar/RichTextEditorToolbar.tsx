import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core'

import { Bold16, Italic16, ListOrdered16, ListUnordered16 } from '../Icon'
import Container from '../Container'
import Select from '../Select'
import styles from './styles'
import TextEditorButton from '../RichTextEditorButton'
import { ButtonHandlerType, SelectOnChangeHandler } from './types'
import { FormatType } from '../RichTextEditor'

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
  name: 'RichTextEditorToolbar'
})

export const RichTextEditorToolbar = forwardRef<HTMLDivElement, Props>(
  function RichTextEditorToolbar(props: Props, ref) {
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
            value={disabled ? '' : format.header}
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
            active={disabled ? false : format.bold}
            disabled={disabled}
          />
          <TextEditorButton
            icon={<Italic16 />}
            onClick={onItalicClick}
            active={disabled ? false : format.italic}
            disabled={disabled}
          />
        </Container>
        <Container className={classes.group}>
          <TextEditorButton
            icon={<ListUnordered16 />}
            onClick={onUnorderedClick}
            active={disabled ? false : format.list === 'bullet'}
            disabled={disabled}
          />
          <TextEditorButton
            icon={<ListOrdered16 />}
            onClick={onOrderedClick}
            active={disabled ? false : format.list === 'ordered'}
            disabled={disabled}
          />
        </Container>
      </Container>
    )
  }
)

RichTextEditorToolbar.defaultProps = {
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

RichTextEditorToolbar.displayName = 'RichTextEditorToolbar'

export default RichTextEditorToolbar
