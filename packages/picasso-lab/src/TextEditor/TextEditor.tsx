import React, { forwardRef, useRef, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import Quill from 'quill'
import { Typography, Container, Button, Select } from '@toptal/picasso'
import { Email16, CheckSolid16, Abstract16, Ach16 } from '@toptal/picasso/Icon'
import './quill.snow.css'

import styles from './styles'
import useInitEditor from './hooks/useInitEditor'
import useHandleChangeEvent from './hooks/useHandleChangeEvent'
import useHandleChangeFromController from './hooks/useHandleChangeFromController'
import useDisableEditor from './hooks/useDisableEditor'
import useHandleAutofocus from './hooks/useHandleAutofocus'
import { HTMLString, TextEditorChangeHandler } from './types'

export interface Props extends BaseProps {
  /** Indicates that an element is to be focused on page load */
  autofocus?: boolean
  /**
   * This Boolean attribute indicates that the user cannot interact with the control.
   */
  disabled?: boolean
  /** unique identificator */
  id: string
  /**
   * The maximum number of characters that the user can enter.
   * If this value isn't specified, the user can enter an unlimited
   * number of characters.
   */
  // TODO implement
  maxlength?: number
  /**
   * The minimum number of characters required that the user should enter.
   */
  // TODO implement
  minlength?: number
  /**
   * Callback on text change
   */
  onChange: TextEditorChangeHandler
  /** The placeholder attribute specifies a short hint that describes the expected value of a text editor. */
  placeholder?: string
  /**
   * This Boolean attribute indicates that the user cannot modify the
   * value of the control. Unlike the disabled attribute, the readonly
   * attribute does not prevent the user from clicking or selecting in the control.
   */
  // TODO implement
  readonly?: boolean
  /**
   * HTML content of TextEditor
   */
  value?: HTMLString
}

const useStyles = makeStyles<Theme>(styles)

const OPTIONS = [
  { value: '1', text: 'Normal Text' },
  { value: '2', text: 'Heading' }
]

export const TextEditor = forwardRef<HTMLDivElement, Props>(function TextEditor(
  {
    'data-testid': dataTestId,
    autofocus,
    className,
    disabled,
    id,
    onChange,
    placeholder,
    style,
    value
  },
  ref
) {
  const editorRef = useRef<Quill>()
  const classes = useStyles()
  const [selected, setSelected] = useState<string>(OPTIONS[0].value)

  useInitEditor(editorRef, { id, placeholder })
  useHandleChangeEvent(editorRef, { onChange })
  useHandleChangeFromController(editorRef, { value })
  useDisableEditor(editorRef, { disabled })
  useHandleAutofocus(editorRef, { autofocus })

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    console.log('Selected:', event.target.value)
    setSelected(event.target.value)
  }

  return (
    <>
      <Container id={`${id}toolbar`}>
        <Container className={classes.qlFormats}>
          <Select
            onChange={handleChange}
            options={OPTIONS}
            value={selected}
            size='small'
            style={{ width: '114px', color: 'black' }}
            menuWidth='123px'
            className={classes.qlHeader}
          />
        </Container>
        <Container className={classes.qlFormats}>
          <Button.Action icon={<Email16 />} className='ql-hmm' />
          <Button.Action icon={<CheckSolid16 />} className='ql-hmm' />
        </Container>
        <Container className={classes.qlFormats}>
          <Button.Action icon={<Abstract16 />} className='ql-hmm' />
          <Button.Action icon={<Ach16 />} className='ql-hmm' />
        </Container>
      </Container>
      <Typography
        as='div'
        variant='body'
        color='dark-grey'
        size='medium'
        className={cx(classes.root, className)}
        data-testid={dataTestId}
        id={id}
        ref={ref}
        style={style}
      />
    </>
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor
