import type {
  ReactNode,
  ChangeEvent,
  HTMLAttributes,
  ReactElement,
  Ref,
  TransitionEvent,
} from 'react'
import React, { forwardRef, useState } from 'react'
import cx from 'classnames'
import { Accordion as BaseUIAccordion } from '@base-ui/react/accordion'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps, TransitionProps } from '@toptal/picasso-shared'
import { toReactEvent } from '@toptal/picasso-shared'
import { ArrowDownMinor16 } from '@toptal/picasso-icons'
import { ButtonAction } from '@toptal/picasso-button'

import { AccordionSummary } from '../AccordionSummary'
import { AccordionDetails } from '../AccordionDetails'
import type { Borders } from './styles'
import {
  createRootClassNames,
  createExpandIconClassNames,
  expandIconAlignTopClasses,
  panelClasses,
} from './styles'

export type { Borders } from './styles'

const ITEM_VALUE = 'item'
const EXPANDED_VALUE = [ITEM_VALUE]
const COLLAPSED_VALUE: string[] = []

const EmptyAccordionSummary = ({
  'data-testid': dataTestId,
}: {
  'data-testid'?: string
}) => <div data-testid={dataTestId} />

export interface Props
  extends Omit<StandardProps, 'classes'>,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Always visible part of accordion */
  children?: ReactNode
  /** Collapsible content of `Accordion` */
  content: ReactNode
  /** Define accordion content state, whether it should be collapsed or expanded */
  expanded?: boolean
  /** Define accordion initial content state */
  defaultExpanded?: boolean
  /** Whether the Accordion is disabled */
  disabled?: boolean
  /** Customize icon indicating expanded status */
  expandIcon?: ReactElement
  /** Defines where the horizontal borders show */
  borders?: Borders
  /** Callback invoked when `Accordion` item is toggled */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void
  /** Animation lifecycle callbacks. `onExited` fires after the collapse transition completes; `timeout` is ignored — the transition is CSS-driven */
  transitionProps?: TransitionProps
  testIds?: {
    emptyAccordionSummary?: string
    accordionSummary?: string
  }
}

const decorateWithExpandIconClasses = (
  expandIcon: ReactElement,
  classes: string
) =>
  React.cloneElement(expandIcon, {
    // Some components overwrite the icon color when disabled
    // That's why we need to apply the disabled state to the icon itself,
    // instead of the ButtonAction wrapper
    className: cx(classes, expandIcon.props.className),
  })

export const Accordion = forwardRef<HTMLElement, Props>(function Accordion(
  {
    borders = 'all',
    defaultExpanded = false,
    disabled = false,
    onChange = () => {},
    ...props
  },
  ref
) {
  const {
    children,
    content,
    expanded,
    expandIcon,
    className,
    style,
    testIds,
    transitionProps,
    // Drop a legacy `classes` prop at runtime so it doesn't leak into the DOM
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: _classes,
    ...rest
  } = props as typeof props & { classes?: unknown }

  const [summaryExpanded, setSummaryExpanded] = useState(defaultExpanded)
  const [prevExpanded, setPrevExpanded] = useState(defaultExpanded)

  // getDerivedStateFromProps implementation to allow expanded to be controlled
  if (expanded !== undefined && expanded !== prevExpanded) {
    setSummaryExpanded(expanded)
    setPrevExpanded(expanded)
  }

  const handleValueChange = (
    value: unknown[],
    eventDetails: BaseUIAccordion.Root.ChangeEventDetails
  ) => {
    const newExpanded = value.length > 0

    setSummaryExpanded(newExpanded)
    onChange(
      toReactEvent<ChangeEvent<Element>>(eventDetails.event),
      newExpanded
    )
  }

  const handlePanelTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (
      !summaryExpanded &&
      event.target === event.currentTarget &&
      event.propertyName === 'height'
    ) {
      transitionProps?.onExited?.(event.currentTarget)
    }
  }

  const expandIconClass = cx(...createExpandIconClassNames(summaryExpanded))

  const appliedBorders = children || expanded ? (borders as Borders) : 'none'

  // The public ref stays HTMLElement for API compatibility; the root part renders a <div>
  const rootRef = ref as Ref<HTMLDivElement>

  // `rest` and Root.Props overlap on the div attribute surface; they differ
  // only on the props overridden below (array-typed value/defaultValue and the
  // BaseUI-evented handlers), so widen once at the boundary.
  const rootRest = rest as Omit<
    BaseUIAccordion.Root.Props,
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'className'
    | 'style'
    | 'disabled'
  >

  return (
    <BaseUIAccordion.Root
      {...rootRest}
      ref={rootRef}
      data-component-type='accordion'
      className={twMerge(
        cx(...createRootClassNames(appliedBorders)),
        className
      )}
      style={style}
      disabled={disabled}
      value={summaryExpanded ? EXPANDED_VALUE : COLLAPSED_VALUE}
      onValueChange={handleValueChange}
    >
      <BaseUIAccordion.Item value={ITEM_VALUE} disabled={disabled}>
        {children ? (
          <BaseUIAccordion.Header render={<div />}>
            <BaseUIAccordion.Trigger
              nativeButton={false}
              render={
                <AccordionSummary data-testid={testIds?.accordionSummary} />
              }
            >
              {children}
              {expandIcon ? (
                <ButtonAction
                  icon={decorateWithExpandIconClasses(
                    expandIcon,
                    expandIconClass
                  )}
                />
              ) : (
                <div className={cx(...expandIconAlignTopClasses)}>
                  <ButtonAction
                    icon={<ArrowDownMinor16 className={expandIconClass} />}
                  />
                </div>
              )}
            </BaseUIAccordion.Trigger>
          </BaseUIAccordion.Header>
        ) : (
          <EmptyAccordionSummary data-testid={testIds?.emptyAccordionSummary} />
        )}
        <BaseUIAccordion.Panel
          keepMounted
          className={cx(...panelClasses)}
          onTransitionEnd={handlePanelTransitionEnd}
        >
          <AccordionDetails>{content}</AccordionDetails>
        </BaseUIAccordion.Panel>
      </BaseUIAccordion.Item>
    </BaseUIAccordion.Root>
  )
})

Accordion.displayName = 'Accordion'

export default Accordion
