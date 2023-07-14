import type { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import {
  Bold16,
  Container,
  Italic16,
  ListOrdered16,
  ListUnordered16,
  Select,
} from '@toptal/picasso'
import { useMultipleForwardRefs } from '@toptal/picasso/utils'
import cx from 'classnames'
import React, { forwardRef } from 'react'

import { useToolbarPortalRegister } from '../plugins/api'
import TextEditorButton from '../RichTextEditorButton'
import styles from './styles'
import type {
  ButtonHandlerType,
  FormatType,
  SelectOnChangeHandler,
} from './types'

type Props = {
  disabled: boolean
  format: FormatType
  testIds?: {
    headerSelect?: string
    boldButton?: string
    italicButton?: string
    unorderedListButton?: string
    orderedListButton?: string
    linkButton?: string
    emojiButton?: string
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

export const ALLOWED_HEADER_TYPE = '3'

export const RichTextEditorToolbar = forwardRef<HTMLDivElement, Props>(
  function RichTextEditorToolbar(props: Props, ref) {
    const {
      disabled,
      format,
      onBoldClick,
      onItalicClick,
      onHeaderChange,
      onUnorderedClick,
      onOrderedClick,
      testIds,
    } = props

    const { setToolbarPortalEl } = useToolbarPortalRegister()

    const toolbarRef = useMultipleForwardRefs([ref, setToolbarPortalEl])

    const classes = useStyles(props)
    const isHeadingFormat = format.header === ALLOWED_HEADER_TYPE

    return (
      <Container ref={toolbarRef} className={classes.toolbar}>
        <Container
          className={cx(classes.group, {
            groupDisabled: disabled,
          })}
        >
          <Select
            onChange={onHeaderChange}
            value={disabled ? '' : format.header}
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
