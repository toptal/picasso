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
import { ArrowDownMinor16 } from '@toptal/picasso-icons'
import { ButtonAction } from '@toptal/picasso-button'

import { AccordionSummary } from '../AccordionSummary'
import { AccordionDetails } from '../AccordionDetails'
import styles from './styles'

export type Borders = 'all' | 'middle' | 'none'
export type ExpandIconPlacement = 'left' | 'right'

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
  /** Customize icon placement */
  expandIconPlacement?: ExpandIconPlacement
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
    expandIconPlacement = 'right',
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

  const renderExpandIcon = (expandIconPosition: 'left' | 'right') => {
    if (expandIcon) {
      return decorateWithExpandIconClasses(expandIcon, expandIconClass)
    }

    return (
      <div
        className={`${classes.expandIconAlignTop} ${
          expandIconPosition === 'left' ? classes.expandIconLeft : ''
        }`}
      >
        <ButtonAction icon={<ArrowDownMinor16 className={expandIconClass} />} />
      </div>
    )
  }

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
            content: `${classes.content} ${
              expandIconPlacement === 'left' ? classes.contentRight : ''
            }`,
          }}
          expandIcon={null}
          onClick={handleSummaryClick}
          data-testid={testIds?.accordionSummary}
        >
          {expandIconPlacement === 'left' && renderExpandIcon('left')}
          {children}
          {expandIconPlacement === 'right' && renderExpandIcon('right')}
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
