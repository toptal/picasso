import React, {
  ReactNode,
  FunctionComponent,
  ChangeEvent,
  HTMLAttributes
} from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { StandardProps } from '../Picasso'
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
  /** Callback invoked when `Accordion` item is toggled */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void
}

export const Accordion: FunctionComponent<Props> = ({
  children,
  content,
  expanded,
  className,
  style,
  classes,
  onChange,
  ...rest
}) => {
  return (
    <MUIExpansionPanel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      classes={{
        root: children ? classes.root : '',
        expanded: classes.expanded
      }}
      className={className}
      style={style}
      elevation={0}
      expanded={expanded}
      onChange={onChange}
    >
      {children && (
        <ExpansionPanelSummary
          classes={{
            root: classes.summary
          }}
          expandIcon={<ChevronRightIcon className={classes.expandIcon} />}
        >
          {children}
        </ExpansionPanelSummary>
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
}

Accordion.defaultProps = {
  expanded: undefined,
  onChange: () => {}
}

Accordion.displayName = 'Accordion'

export default withStyles(styles)(Accordion)
