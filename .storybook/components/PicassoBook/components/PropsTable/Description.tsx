import React from 'react'

import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'

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

  return <ReactMarkdown className={classes.markdown} source={description} />
}

export default withStyles(styles)(Description)
