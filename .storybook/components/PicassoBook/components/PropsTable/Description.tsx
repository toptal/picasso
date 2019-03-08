import React from 'react'

import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'

import styles from './styles'

const HIGHLIGHT_REGEXP: RegExp = /(`.*?`)/g

interface Props {
  description: string
  classes: Partial<ClassNameMap<string>>
  propName?: string
}

const Description = ({
  description,
  classes,
  propName
}: Props): JSX.Element => {
  if (!description) {
    window.console.warn(`Failed to parse description for '${propName}'`)
  }

  const parts = description.split(HIGHLIGHT_REGEXP)

  const children = parts.map((part, i) => {
    if (part.match(HIGHLIGHT_REGEXP)) {
      return (
        <span key={i} className={cx(classes.sourceCode, classes.highlight)}>
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
