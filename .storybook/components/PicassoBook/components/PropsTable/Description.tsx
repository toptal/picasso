import React from 'react'

import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

const HIGHLIGHT_REGEXP: RegExp = /(`.*?`)/g

interface Props {
  description: string
  classes: Partial<ClassNameMap<string>>
}

const Description = ({ description, classes }: Props): JSX.Element => {
  const parts = description.split(HIGHLIGHT_REGEXP)

  const children = parts.map(part => {
    if (part.match(HIGHLIGHT_REGEXP)) {
      return (
        <span className={cx(classes.sourceCode, classes.highlight)}>
          {part.replace(/`/g, '')}
        </span>
      )
    } else {
      return part
    }
  })

  return <div>{children}</div>
}

export default withStyles(styles)(Description)
