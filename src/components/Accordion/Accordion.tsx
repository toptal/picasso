import React, {
  ReactNode,
  FunctionComponent,
  ChangeEvent,
  HTMLAttributes,
  ComponentType
} from 'react'
import cx from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MUIExpansionPanel from '@material-ui/core/ExpansionPanel'

import { StandardProps } from '../Picasso'
import ArrowDownMinor16, { Props as IconProps } from '../Icon/ArrowDownMinor16'
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
  /** Customize icon indicating expanded status */
  expandIcon?: ComponentType<IconProps>
  /** Defines if the horizontal borders show */
  bordered?: boolean
  /** Callback invoked when `Accordion` item is toggled */
  onChange?: (event: ChangeEvent<{}>, expanded: boolean) => void
}

export const Accordion: FunctionComponent<Props> = ({
  children,
  content,
  expanded,
  expandIcon,
  bordered,
  className,
  style,
  classes,
  onChange,
  ...rest
}) => {
  const ExpandIcon = expandIcon

  return (
    <MUIExpansionPanel
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      classes={{
        root: children
          ? cx(classes.root, { [classes.bordered]: bordered })
          : '',
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
            root: classes.summary,
            content: classes.content
          }}
          expandIcon={
            expandIcon ? (
              // @ts-ignore
              <ExpandIcon className={classes.expandIcon} />
            ) : (
              <ArrowDownMinor16 className={classes.expandIcon} />
            )
          }
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
  bordered: true,
  expanded: undefined,
  onChange: () => {}
}

Accordion.displayName = 'Accordion'

export default withStyles(styles)(Accordion)
