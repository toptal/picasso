import React from 'react'

import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import { withStyles } from '@material-ui/core/styles'
import ReactMarkdown from 'react-markdown'

import styles from './styles'

interface Props {
  children: string
  classes: Partial<ClassNameMap<string>>
}

const Markdown = ({ children, classes }: Props): JSX.Element => {
  return <ReactMarkdown className={classes.root}>{children}</ReactMarkdown>
}

Markdown.displayName = 'Markdown'

export default withStyles(styles)(Markdown)
