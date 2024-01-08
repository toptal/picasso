import type { ReactElement, ReactNode } from 'react'
import React from 'react'
import type { Theme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import type { BaseProps } from '@toptal/picasso-shared'
import cx from 'classnames'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'

import styles from './styles'

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
      className={cx(classes.root, classes.tableRow, className)}
      flex
    >
      <Container className={cx(classes.tableCell)}>
        <Container
          flex
          direction='column'
          alignItems='center'
          right='medium'
          className={classes.tableCellContent}
        >
          {typeof icon !== 'undefined' ? (
            React.cloneElement(icon, {
              className: cx(icon.props.className, classes.icon),
            })
          ) : (
            <div className={classes.dot} data-testid={testIds.dot} />
          )}
          {hasConnector && (
            <div
              className={classes.connector}
              data-testid={testIds.connector}
            />
          )}
        </Container>
      </Container>

      {date && (
        <Container
          className={cx(classes.tableCell)}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Container className={classes.date} right='large'>
            <Typography
              className={classes.dateText}
              weight='semibold'
              size='medium'
            >
              {date}
            </Typography>
          </Container>
        </Container>
      )}

      <Container className={cx(classes.tableCell)}>
        <Container className={classes.content} bottom='large'>
          {children}
        </Container>
      </Container>
    </Container>
  )
}

TimelineRow.defaultProps = {
  hasConnector: true,
}

TimelineRow.displayName = 'TimelineRow'

export default TimelineRow
