import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core'

import { Bold16, Italic16, ListOrdered16, ListUnordered16 } from '../Icon'
import Container from '../Container'
import Select from '../Select'
import styles from './styles'
import TextEditorButton from '../RichTextEditorButton'
import { ButtonHandlerType, SelectOnChangeHandler, FormatType } from './types'

type Props = {
  disabled: boolean
  id: string
  format: FormatType
  testIds?: {
    headerSelect?: string
    boldButton?: string
    italicButton?: string
    unorderedListButton?: string
    orderedListButton?: string
  }
  onBoldClick: ButtonHandlerType
  onItalicClick: ButtonHandlerType
  onHeaderChange: SelectOnChangeHandler
  onUnorderedClick: ButtonHandlerType
  onOrderedClick: ButtonHandlerType
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'RichTextEditorToolbar',
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
      onOrderedClick,
      testIds,
    } = props

    const classes = useStyles(props)
    const isHeadingFormat = format.header === '3'

    return (
      <Container id={`${id}toolbar`} ref={ref} className={classes.toolbar}>
        <Container className={classes.group}>
          <Select
            onChange={onHeaderChange}
            value={format.header}
            options={[
              { value: '3', text: 'heading' },
              { value: '', text: 'normal' },
            ]}
            size='small'
            menuWidth='123px'
            className={classes.select}
            disabled={disabled}
            data-testid={testIds?.headerSelect}
          />
        </Container>
        <Container className={classes.group}>
          <TextEditorButton
            icon={<Bold16 />}
            onClick={onBoldClick}
            active={isHeadingFormat ? false : format.bold}
            disabled={isHeadingFormat || disabled}
            data-testid={testIds?.boldButton}
          />
          <TextEditorButton
            icon={<Italic16 />}
            onClick={onItalicClick}
            active={isHeadingFormat ? false : format.italic}
            disabled={isHeadingFormat || disabled}
            data-testid={testIds?.italicButton}
          />
        </Container>
        <Container className={classes.group}>
          <TextEditorButton
            icon={<ListUnordered16 />}
            onClick={onUnorderedClick}
            active={format.list === 'bullet'}
            disabled={disabled}
            data-testid={testIds?.unorderedListButton}
          />
          <TextEditorButton
            icon={<ListOrdered16 />}
            onClick={onOrderedClick}
            active={format.list === 'ordered'}
            disabled={disabled}
            data-testid={testIds?.orderedListButton}
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
    header: '',
  },
  onBoldClick: () => {},
  onItalicClick: () => {},
  onHeaderChange: () => {},
  onUnorderedClick: () => {},
  onOrderedClick: () => {},
}

RichTextEditorToolbar.displayName = 'RichTextEditorToolbar'

export default RichTextEditorToolbar
