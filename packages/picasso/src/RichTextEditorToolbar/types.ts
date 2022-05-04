import { ChangeEvent, MouseEventHandler } from 'react'

import { HeaderValue } from '../RichTextEditor/store/toolbar/types'

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValue
  }>
) => void
