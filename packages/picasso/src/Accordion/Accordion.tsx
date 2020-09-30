import React, {
  ReactNode,
  ChangeEvent,
  HTMLAttributes,
  ReactElement,
  forwardRef,
  FunctionComponent,
  useState
} from 'react'
import cx from 'classnames'
import MUIAccordion from '@material-ui/core/Accordion'
import { makeStyles } from '@material-ui/styles'
import {
  CompoundedComponentWithRef,
  StandardProps
} from '@toptal/picasso-shared'

import { ArrowDownMinor16 } from '../Icon'
import AccordionSummary from '../AccordionSummary'
import AccordionDetails from '../AccordionDetails'
import styles from './styles'
import Button from '../Button'

const useStyles = makeStyles(styles)

const Summary: FunctionComponent = props => {
  const { children } = props
  const classes = useStyles(props)

  return <div className={classes.summaryWrapper}>{children}</div>
}

const Details: FunctionComponent<{ className?: string }> = props => {
  const { children, className } = props
  const classes = useStyles(props)

  return <div className={cx(className, classes.detailsWrapper)}>{children}</div>
}

export interface StaticProps {
  Summary: typeof Summary
  Details: typeof Details
}

export interface Props
  extends Partial<StandardProps>,
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
  /** Defines if the horizontal borders show */
  bordered?: boolean
  /** Callback invoked when `Accordion` item is toggled */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EmptyAccordionSummary = ({ expanded }: { expanded?: boolean }) => <div />

const decorateWithExpandIconClasses = (
  expandIcon: ReactElement,
  classes: string
) =>
  React.cloneElement(expandIcon, {
    className: cx(expandIcon.props.className, classes)
  })

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
    bordered,
    disabled,
    className,
    style,
    onChange,
    ...rest
  } = props

  const classes = useStyles(props)
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

  return (
    <MUIAccordion
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={{
        root:
          children || bordered
            ? cx(classes.root, { [classes.bordered]: bordered })
            : ''
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
}) as CompoundedComponentWithRef<Props, HTMLDivElement, StaticProps>

Accordion.defaultProps = {
  bordered: true,
  defaultExpanded: false,
  disabled: false,
  expanded: undefined,
  onChange: () => {}
}

Accordion.displayName = 'Accordion'

Accordion.Summary = Summary
Accordion.Details = Details

export default Accordion
