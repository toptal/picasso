import type { HTMLAttributes, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps, ButtonOrAnchorProps } from '@toptal/picasso-shared'

import { summaryRootClasses, summaryContentClasses } from './styles'

export interface Props
  extends Omit<StandardProps, 'classes'>,
    ButtonOrAnchorProps {
  /** Icon rendered after the summary content */
  expandIcon?: ReactNode
  /** Content of the summary row */
  children?: ReactNode
  /** Callback invoked when the summary is clicked */
  onClick?: () => void
}

export const AccordionSummary = forwardRef<HTMLDivElement, Props>(
  function AccordionSummary(props, ref) {
    const {
      children,
      expandIcon,
      className,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      classes: _classes,
      ...rest
    } = props as Props & { classes?: unknown }

    // ButtonOrAnchorProps handlers are anchor/button-element-typed; the root
    // renders a <div>. React event handlers fire identically regardless of the
    // currentTarget element type, so widen once at the boundary instead of
    // narrowing the public Props.
    const divRest = rest as HTMLAttributes<HTMLDivElement>

    return (
      <div
        {...divRest}
        ref={ref}
        data-component-type='accordion-summary'
        className={twMerge(cx(...summaryRootClasses), className)}
      >
        <div
          data-component-type='accordion-summary-content'
          className={cx(...summaryContentClasses)}
        >
          {children}
        </div>
        {expandIcon}
      </div>
    )
  }
)

AccordionSummary.displayName = 'AccordionSummary'

export default AccordionSummary
