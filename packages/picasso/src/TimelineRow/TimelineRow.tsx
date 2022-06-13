import React, { ReactElement, ReactNode } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'

import styles from './styles'
import Container from '../Container'
import Typography from '../Typography'

export interface Props extends BaseProps {
  /** Timeline row content */
  children: ReactNode
  /** Icon for the row between lines */
  icon?: ReactElement
  /** Timeline row date */
  date?: string
  /** Whether to render a connector line after the row */
  hasConnector?: boolean
  testIds?: {
    dot?: string
    connector?: string
  }
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTimelineRow',
})

const TimelineRow = ({
  className,
  children,
  icon,
  date,
  hasConnector,
  'data-testid': dataTestId,
  testIds = {},
}: Props) => {
  const classes = useStyles()

  return (
    <Container
      data-testid={dataTestId}
      className={cx(classes.root, className)}
      flex
    >
      <Container flex direction='column' alignItems='center' right='medium'>
        {typeof icon !== 'undefined' ? (
          React.cloneElement(icon, {
            className: cx(icon.props.className, classes.icon),
          })
        ) : (
          <div className={classes.dot} data-testid={testIds.dot} />
        )}
        {hasConnector && (
          <div className={classes.connector} data-testid={testIds.connector} />
        )}
      </Container>

      {date && (
        <Container className={classes.date} right='large'>
          <Typography
            className={classes.dateText}
            weight='semibold'
            size='medium'
          >
            {date}
          </Typography>
        </Container>
      )}

      <Container className={classes.content} bottom='large'>
        {children}
      </Container>
    </Container>
  )
}

TimelineRow.defaultProps = {
  hasConnector: true,
}

TimelineRow.displayName = 'TimelineRow'

export default TimelineRow
