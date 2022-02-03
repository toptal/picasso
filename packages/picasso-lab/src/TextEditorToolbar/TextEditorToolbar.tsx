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
import { FormatType } from '../QuillEditor'

type Props = {
  id: string
  format: FormatType
  handleHeader: SelectOnChangeHandler
  handleBold: ButtonHandlerType
  handleItalic: ButtonHandlerType
  handleOrdered: ButtonHandlerType
  handleUnordered: ButtonHandlerType
  disabled?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorToolbar'
})

export const TextEditorToolbar = forwardRef<HTMLDivElement, Props>(
  function TextEditorToolbar(props: Props, ref) {
    const {
      id,
      format,
      handleHeader,
      handleBold,
      handleItalic,
      handleOrdered,
      handleUnordered,
      disabled
    } = props

    const classes = useStyles(props)

    return (
      <Container id={`${id}toolbar`} ref={ref} className={classes.toolbar}>
        <Container className={classes.group}>
          <Select
            onChange={handleHeader}
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
            onClick={handleBold}
            active={format.bold}
            disabled={disabled}
          />
          <TextEditorButton
            icon={<Italic16 />}
            onClick={handleItalic}
            active={format.italic}
            disabled={disabled}
          />
        </Container>
        <Container className={classes.group}>
          <TextEditorButton
            icon={<ListUnordered16 />}
            onClick={handleUnordered}
            active={format.list === 'bullet'}
            disabled={disabled}
          />
          <TextEditorButton
            icon={<ListOrdered16 />}
            onClick={handleOrdered}
            active={format.list === 'ordered'}
            disabled={disabled}
          />
        </Container>
      </Container>
    )
  }
)

TextEditorToolbar.displayName = 'TextEditorToolbar'

export default TextEditorToolbar
