import React, {
  ReactNode,
  ChangeEvent,
  HTMLAttributes,
  ReactElement,
  forwardRef,
  useState
} from 'react'
import cx from 'classnames'
import MUIAccordion from '@material-ui/core/Accordion'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { StandardProps } from '@toptal/picasso-shared'

import { ArrowDownMinor16 } from '../Icon'
import AccordionSummary from '../AccordionSummary'
import AccordionDetails from '../AccordionDetails'
import styles from './styles'
import Button from '../Button'

export type Borders = 'all' | 'middle' | 'none'

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoAccordion'
})

export const EmptyAccordionSummary = () => (
  <div data-testid='picasso-empty-accordion-summary' />
)

export interface SummaryProps extends Partial<StandardProps> {
  children: ReactNode
}

export const Summary = (props: SummaryProps) => {
  const { children, className, ...rest } = props
  const classes = useStyles(props)

  return (
    <div {...rest} className={cx(className, classes.summaryWrapper)}>
      {children}
    </div>
  )
}

export interface DetailsProps extends Partial<StandardProps> {
  children: ReactNode
}

export const Details = (props: DetailsProps) => {
  const { children, className, ...rest } = props
  const classes = useStyles(props)

  return (
    <div {...rest} className={cx(className, classes.detailsWrapper)}>
      {children}
    </div>
  )
}

export interface StaticProps {
  Summary: typeof Summary
  Details: typeof Details
}

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
}

const decorateWithExpandIconClasses = (
  expandIcon: ReactElement,
  classes: string
) =>
  React.cloneElement(expandIcon, {
    className: cx(expandIcon.props.className, classes)
  })

/* eslint-disable complexity */
export const Accordion = forwardRef<HTMLElement, Props>(function Accordion (
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
    ...rest
  } = props

  const classes = useStyles(props)
  const borderClasses: { [key in Borders]: string } = {
    all: classes.bordersAll,
    middle: classes.bordersMiddle,
    none: classes.bordersNone
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
    [classes.expandIconExpanded]: summaryExpanded
  })

  const appliedBorders = children || expanded ? (borders as Borders) : 'none'

  return (
    <MUIAccordion
      {...rest}
      ref={ref}
      classes={{
        root: cx(classes.root, borderClasses[appliedBorders])
      }}
      className={className}
      style={style}
      elevation={0}
      expanded={summaryExpanded}
      disabled={disabled}
      onChange={onChange}
    >
      {children ? (
        <AccordionSummary
          classes={{
            root: classes.summary,
            content: classes.content
          }}
          expandIcon={null}
          onClick={handleSummaryClick}
        >
          {children}
          {expandIcon ? (
            decorateWithExpandIconClasses(expandIcon, expandIconClass)
          ) : (
            <div className={classes.expandIconAlignTop}>
              <Button.Action
                icon={<ArrowDownMinor16 className={expandIconClass} />}
              />
            </div>
          )}
        </AccordionSummary>
      ) : (
        <EmptyAccordionSummary />
      )}
      <AccordionDetails
        classes={{
          root: classes.details
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
  onChange: () => {}
}

Accordion.displayName = 'Accordion'

export default Object.assign(Accordion, {
  Summary,
  Details
})
