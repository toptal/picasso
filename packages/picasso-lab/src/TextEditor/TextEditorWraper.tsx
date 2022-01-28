import React, {FC, useEffect, useState} from "react";
import Quill from "quill";
import {makeBoldFormat, makeHeaderFormat, useTypographyClasses} from "@toptal/picasso-lab/TextEditor/formats";
import {getModules} from "@toptal/picasso-lab/TextEditor/hooks/useQuillInstance/useQuillInstance";
import useToolbarState from "@toptal/picasso-lab/TextEditor/hooks/useToolbarState";
import TextEditorToolbar from "@toptal/picasso-lab/TextEditor/TextEditorToolbar";
import {BaseProps, Container, Typography} from "@toptal/picasso";
import cx from "classnames";
import {makeStyles, Theme} from "@material-ui/core/styles";
import styles from './styles'
import {ToolbarHandlers, ToolbarStateType} from "@toptal/picasso-lab/TextEditor/types";

const useStyles = makeStyles<Theme>(styles, {
  name: 'TextEditor'
})

type Params = BaseProps & {
  disabled?: boolean
  className?: string
}

const TextEditorWraper: FC<{id: string, params: Params}> = ({id, children, params}) => {
  const {disabled, className, style, 'data-testid': dataTestId} = params
  const [quill, setQuill] = useState<Quill>()
  // const typographyClasses = useTypographyClasses()
  const { actions, toolbarState } = useToolbarState()

  useEffect(() => {
    // Quill.register(makeHeaderFormat(typographyClasses), true)
    // Quill.register(makeBoldFormat(typographyClasses), true)


    setQuill(
      new Quill(`#${id}`, {
        modules: getModules(id, actions),
        // formats,
        // placeholder
      })
    )
  }, [
    // typographyClasses,
    id,
    // actions,
    // placeholder
  ])

  // return quill
  const [bla, setBla] = useState<{
    isToolbarDisabled: boolean
    toolbarState: ToolbarStateType
    toolbarHandlers: ToolbarHandlers
  }>()
  const classes = useStyles()

  return (
    <Container
      className={cx(classes.editorWrapper, {
        [classes.disabled]: disabled
      })}
    >
      {!!quill ? (
        <TextEditorToolbar
          id={id}
          state={toolbarState}
          handlers={bla?.toolbarHandlers}
          disabled={disabled || bla?.isToolbarDisabled}
        />
      ) : <div id={`${id}toolbar`} />}

      <Typography
        as='div'
        variant='body'
        color='dark-grey'
        size='medium'
        className={cx(classes.root, className)}
        data-testid={dataTestId}
        id={id}
        style={style}
      />
      <div>
        {!!quill && children}
      </div>
    </Container>
  )
}

export default TextEditorWraper
