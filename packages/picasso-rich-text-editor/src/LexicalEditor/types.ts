import type { ReactElement } from 'react'

import type { RTEPlugin } from '../plugins/api'

export type ChangeHandler = (html: string) => void

export type { TextLengthChangeHandler } from '../plugins/TextLengthPlugin'

export type EditorPlugin =
  | 'link'
  | 'emoji'
  | ReactElement<unknown, RTEPlugin<unknown>>
