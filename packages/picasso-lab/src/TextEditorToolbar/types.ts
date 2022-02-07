import { ChangeEvent, MouseEventHandler } from 'react'

import { HeaderValue } from '../TextEditor'

export type ButtonHandlerType = MouseEventHandler<HTMLButtonElement>

export type SelectOnChangeHandler = (
  event: ChangeEvent<{
    value: HeaderValue
  }>
) => void
