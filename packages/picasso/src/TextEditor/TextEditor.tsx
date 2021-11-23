import { BaseProps } from '@toptal/picasso-shared'
import React, { useEffect, useRef } from 'react'
import Quill from 'quill'

import makeHeaderFormat, { useHeaderStyles } from './formats/make-header-format'

export interface Props extends BaseProps {
  id: string
}

// TODO: Generate ID with a lib?
const TextEditor = ({ id }: Props) => {
  const editor = useRef<Quill>()

  const typographyClasses = useHeaderStyles()

  useEffect(() => {
    Quill.register(makeHeaderFormat(typographyClasses), true)

    editor.current = new Quill(`#${id}`, {
      modules: {
        toolbar: `#${id}Toolbar`
      },
      readOnly: false
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    editor.current?.setContents({
      ops: [
        {
          insert: 'Header 1'
        },
        {
          insert: '\n',
          attributes: {
            header: 1
          }
        }
      ]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div id={id} />
      <div id={`${id}Toolbar`} />
    </>
  )
}

export default TextEditor
