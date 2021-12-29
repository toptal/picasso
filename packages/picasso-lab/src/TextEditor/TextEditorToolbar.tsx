import React from 'react'
import cx from 'classnames'
import { Container, Button, Select } from '@toptal/picasso'
import {
  Bold16,
  Italic16,
  ListOrdered16,
  ListUnordered16
} from '@toptal/picasso/Icon'
import { makeStyles, Theme } from '@material-ui/core'

import styles from './styles'

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
  handleFormatChange: (event: React.ChangeEvent<{ value: string }>) => void
  formatOptions: OptionType[]
  currentFormat: OptionType['value']
  textState: ToolbarState
  toggleTextState: (key: ToolbarKey) => () => void
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditorToolbar',
  index: 10
})

export const TextEditorToolbar = (props: Props) => {
  const {
    id,
    textState,
    toggleTextState,
    currentFormat,
    formatOptions,
    handleFormatChange
  } = props

  const classes = useStyles()

  return (
    <Container id={`${id}toolbar`} className={classes.qlToolbar}>
      <Container className={classes.qlFormats}>
        <Select
          onChange={handleFormatChange}
          options={formatOptions}
          value={currentFormat}
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
            [classes.activeButton]: textState.bold
          })}
          onClick={toggleTextState('bold')}
        />
        <Button.Circular
          variant='flat'
          icon={<Italic16 />}
          className={cx(classes.button, {
            [classes.activeButton]: textState.italic
          })}
          onClick={toggleTextState('italic')}
        />
      </Container>
      <Container className={classes.qlFormats}>
        <Button.Circular
          variant='flat'
          icon={<ListUnordered16 />}
          className={cx(classes.button, {
            [classes.activeButton]: textState.unorderedList
          })}
          onClick={toggleTextState('unorderedList')}
        />
        <Button.Circular
          variant='flat'
          icon={<ListOrdered16 />}
          className={cx(classes.button, {
            [classes.activeButton]: textState.orderedList
          })}
          onClick={toggleTextState('orderedList')}
        />
      </Container>
    </Container>
  )
}

TextEditorToolbar.displayName = 'TextEditorToolbar'

export default TextEditorToolbar
