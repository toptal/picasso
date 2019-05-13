import { CSSProperties } from 'react'

import { Classes } from '../styles/types'

export interface BaseProps {
  /** Classnames applied to root element */
  className?: string
  /** Style applied to root element */
  style?: CSSProperties
}

export interface JssProps {
  classes: Classes
}

export type StandardProps = BaseProps & JssProps

// Take all props, excluding props from JssProps type
export type UserProps<T> = Pick<T, Exclude<keyof T, keyof JssProps>>

type Sizes = 'xsmall' | 'small' | 'medium' | 'large'

export type SizeType<T extends Sizes> = T
