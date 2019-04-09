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

type Sizes = 'xsmall' | 'small' | 'medium' | 'large'

export type SizeType<T extends Sizes> = T
