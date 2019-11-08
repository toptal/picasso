import React, {
  ReactNode,
  ChangeEvent,
  HTMLAttributes,
  ReactElement,
  forwardRef,
  useState
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel'

import { StandardProps } from '../Picasso'
import { ArrowDownMinor16 } from '../Icon'
import ExpansionPanelSummary from '../ExpansionPanelSummary'
import ExpansionPanelDetails from '../ExpansionPanelDetails'
import styles from './styles'

export interface Props
  extends StandardProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Always visible part of accordion */
  children?: ReactNode
  /** Collapsible content of `Accordion` */
  content: ReactNode
  /** Define accordion content state, whether it should be collapsed or displayed */
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
const EmptyExpansionPanelSummary = ({ expanded }: { expanded?: boolean }) => (
  <div />
)

const decorateWithExpandIconClasses = (
  expandIcon: ReactElement,
  classes: string
) =>
  React.cloneElement(expandIcon, {
    className: cx(expandIcon.props.className, classes)
  })

export const Accordion = forwardRef<HTMLElement, Props>(function Accordion(
  {
    children,
    content,
    expanded,
    defaultExpanded,
    expandIcon,
    bordered,
    disabled,
    className,
    style,
    classes,
    onChange,
    ...rest
  },
  ref
) {
  const [summaryExpanded, setSummaryExpanded] = useState(defaultExpanded)
  const [prevExpanded, setPrevExpanded] = useState(defaultExpanded)

  // getDerivedStateFromProps implementation to allow expanded to be controlled
  if (expanded !== undefined && expanded !== prevExpanded) {
    setSummaryExpanded(expanded)
    setPrevExpanded(expanded)
  }

  const handleSummaryClick = () => {
    setSummaryExpanded(expanded => !expanded)
  }

  return (
    <MUIExpansionPanel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      ref={ref}
      classes={{
        root: children ? cx(classes.root, { [classes.bordered]: bordered }) : ''
      }}
      className={className}
      style={style}
      elevation={0}
      expanded={summaryExpanded}
      disabled={disabled}
      onChange={onChange}
    >
      {children ? (
        <ExpansionPanelSummary
          classes={{
            root: classes.summary,
            content: classes.content
          }}
          expandIcon={null}
          onClick={handleSummaryClick}
        >
          {children}
          {expandIcon ? (
            decorateWithExpandIconClasses(
              expandIcon,
              cx(classes.expandIcon, {
                [classes.expandIconExpanded]: summaryExpanded
              })
            )
          ) : (
            <div className={classes.expandIconAlignTop}>
              <ArrowDownMinor16
                className={cx(classes.expandIcon, {
                  [classes.expandIconExpanded]: summaryExpanded
                })}
              />
            </div>
          )}
        </ExpansionPanelSummary>
      ) : (
        <EmptyExpansionPanelSummary />
      )}
      <ExpansionPanelDetails
        classes={{
          root: classes.details
        }}
      >
        {content}
      </ExpansionPanelDetails>
    </MUIExpansionPanel>
  )
})

Accordion.defaultProps = {
  bordered: true,
  defaultExpanded: false,
  disabled: false,
  expanded: undefined,
  onChange: () => {}
}

Accordion.displayName = 'Accordion'

export default withStyles(styles)(Accordion)
