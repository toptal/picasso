import React from 'react'
import cx from 'classnames'
import { Container, Button, Select } from '@toptal/picasso'
import {
  Bold16,
  Italic16,
  ListOrdered16,
  ListUnordered16
} from '@toptal/picasso/Icon'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'

type OptionType = {
  // It might be better to have string as a type for value so we can later
  // access class names from style.ts with value
  value: string
  text: string
}

export type ToolbarState = {
  bold: boolean
  italic: boolean
  unorderedList: boolean
  orderedList: boolean
}

export type ToolbarKey = keyof ToolbarState

type Props = {
  id: string
  classes: ClassNameMap<string>
  handleFormattingChange: (event: React.ChangeEvent<{ value: string }>) => void
  formatingOptions: OptionType[]
  selected: OptionType['value']
  toolbarAction: ToolbarState
  toggleActiveFormat: (key: ToolbarKey) => () => void
}

export const TextEditorToolbar = (props: Props) => {
  const {
    id,
    toolbarAction,
    toggleActiveFormat,
    selected,
    formatingOptions,
    handleFormattingChange,
    classes
  } = props

  return (
    <Container id={`${id}toolbar`} className={classes.qlToolbar}>
      <Container className={classes.qlFormats}>
        <Select
          onChange={handleFormattingChange}
          options={formatingOptions}
          value={selected}
          size='small'
          menuWidth='123px'
          className={classes.textStylesSelect}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <Button.Circular
          variant='flat'
          icon={<Bold16 />}
          className={cx(classes.button, {
            [classes.activeButton]: toolbarAction.bold
          })}
          onClick={toggleActiveFormat('bold')}
        />
        <Button.Circular
          variant='flat'
          icon={<Italic16 />}
          className={cx(classes.button, {
            [classes.activeButton]: toolbarAction.italic
          })}
          onClick={toggleActiveFormat('italic')}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <Button.Circular
          variant='flat'
          icon={<ListUnordered16 />}
          className={cx(classes.button, {
            [classes.activeButton]: toolbarAction.unorderedList
          })}
          onClick={toggleActiveFormat('unorderedList')}
        />
        <Button.Circular
          variant='flat'
          icon={<ListOrdered16 />}
          className={cx(classes.button, {
            [classes.activeButton]: toolbarAction.orderedList
          })}
          onClick={toggleActiveFormat('orderedList')}
        />
      </Container>
    </Container>
  )
}

TextEditorToolbar.displayName = 'TextEditorToolbar'

export default TextEditorToolbar
