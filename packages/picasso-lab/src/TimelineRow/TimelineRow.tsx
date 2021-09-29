import React, { ReactElement, ReactNode } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { BaseProps } from '@toptal/shared'
import { Container, Typography } from '@toptal/picasso'
import cx from 'classnames'

import TimelineConnector from '../TimelineConnector'
import TimelineDotIcon from '../TimelineDotIcon'
import styles from './styles'

export type Props = BaseProps & {
  children: ReactNode
  icon?: ReactElement
  date?: string
  hasConnector?: boolean
}

const useStyles = makeStyles<Theme>(styles, {
  name: 'PicassoTimelineRow'
})

const TimelineRow = ({
  className,
  children,
  icon,
  date,
  hasConnector
}: Props) => {
  const classes = useStyles()

  return (
    <Container className={cx(classes.root, className)} flex>
      <Container flex direction='column' alignItems='center' right='medium'>
        {icon ? (
          React.cloneElement(icon, {
            className: classes.icon,
            color: 'darkGrey'
          })
        ) : (
          <TimelineDotIcon />
        )}
        {hasConnector && <TimelineConnector className={classes.connector} />}
      </Container>

      {date && (
        <Container className={classes.date} right='large'>
          <Typography weight='semibold' size='medium'>
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
  hasConnector: true
}

export default TimelineRow
