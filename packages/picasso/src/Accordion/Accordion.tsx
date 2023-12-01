/* eslint-disable import/no-extraneous-dependencies */
import type {
  ReactNode,
  ChangeEvent,
  HTMLAttributes,
  ReactElement,
} from 'react'
import React, { forwardRef, useState } from 'react'
import cx from 'classnames'
import { Accordion as MUIAccordion } from '@material-ui/core'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { StandardProps, TransitionProps } from '@toptal/picasso-shared'
import { ArrowDownMinor16 } from '@toptal/picasso-icon'
import AccordionSummary from '@toptal/picasso-accordion-summary'
import AccordionDetails from '@toptal/picasso-accordion-details'
import ButtonAction from '@toptal/picasso-button-action'

import styles from './styles'

export type Borders = 'all' | 'middle' | 'none'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAccordion',
})

const EmptyAccordionSummary = ({
  'data-testid': dataTestId,
}: {
  'data-testid'?: string
}) => <div data-testid={dataTestId} />

export interface Props
  extends StandardProps,
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
  /** Animation lifecycle callbacks. Backed by [react-transition-group/Transition](https://reactcommunity.org/react-transition-group/transition#Transition-props) */
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
    className: cx(expandIcon.props.className, classes),
  })

/* eslint-disable complexity */
export const Accordion = forwardRef<HTMLElement, Props>(function Accordion(
  props,
  ref
) {
  const {
    children,
    content,
    expanded,
    defaultExpanded,
    expandIcon,
    borders,
    disabled,
    className,
    style,
    onChange,
    testIds,
    transitionProps,
    ...rest
  } = props

  const classes = useStyles(props)
  const borderClasses: { [key in Borders]: string } = {
    all: classes.bordersAll,
    middle: classes.bordersMiddle,
    none: classes.bordersNone,
  }
  const [summaryExpanded, setSummaryExpanded] = useState(defaultExpanded)
  const [prevExpanded, setPrevExpanded] = useState(defaultExpanded)

  // getDerivedStateFromProps implementation to allow expanded to be controlled
  if (expanded !== undefined && expanded !== prevExpanded) {
    setSummaryExpanded(expanded)
    setPrevExpanded(expanded)
  }

  const handleSummaryClick = () => {
    setSummaryExpanded(!summaryExpanded)
  }

  const expandIconClass = cx(classes.expandIcon, {
    [classes.expandIconExpanded]: summaryExpanded,
  })

  const appliedBorders = children || expanded ? (borders as Borders) : 'none'

  return (
    <MUIAccordion
      {...rest}
      ref={ref}
      classes={{
        root: cx(classes.root, borderClasses[appliedBorders]),
      }}
      className={className}
      style={style}
      elevation={0}
      expanded={summaryExpanded}
      disabled={disabled}
      onChange={onChange}
      TransitionProps={transitionProps}
    >
      {children ? (
        <AccordionSummary
          classes={{
            root: classes.summary,
            content: classes.content,
          }}
          expandIcon={null}
          onClick={handleSummaryClick}
          data-testid={testIds?.accordionSummary}
        >
          {children}
          {expandIcon ? (
            decorateWithExpandIconClasses(expandIcon, expandIconClass)
          ) : (
            <div className={classes.expandIconAlignTop}>
              <ButtonAction
                icon={<ArrowDownMinor16 className={expandIconClass} />}
              />
            </div>
          )}
        </AccordionSummary>
      ) : (
        <EmptyAccordionSummary data-testid={testIds?.emptyAccordionSummary} />
      )}
      <AccordionDetails
        classes={{
          root: classes.details,
        }}
      >
        {content}
      </AccordionDetails>
    </MUIAccordion>
  )
})

Accordion.defaultProps = {
  borders: 'all',
  defaultExpanded: false,
  disabled: false,
  expanded: undefined,
  onChange: () => {},
}

Accordion.displayName = 'Accordion'

export default Accordion
