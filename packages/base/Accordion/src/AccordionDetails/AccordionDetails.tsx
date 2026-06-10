import type { ReactNode, HTMLAttributes } from 'react'
import React from 'react'
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'

import { detailsClasses } from './styles'

export interface Props
  extends Omit<StandardProps, 'classes'>,
    HTMLAttributes<HTMLDivElement> {
  /** Content of the expanded accordion */
  children?: ReactNode
}

const AccordionDetails = (props: Props) => {
  const {
    children,
    className,
    // Drop a legacy `classes` prop at runtime so it doesn't leak into the DOM
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: _classes,
    ...rest
  } = props as Props & { classes?: unknown }

  return (
    <div {...rest} className={twMerge(cx(...detailsClasses), className)}>
      {children}
    </div>
  )
}

export default AccordionDetails
