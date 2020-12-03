import React from 'react'

import ReactMarkdown from 'react-markdown'
import { StandardProps, mergeClasses } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'

interface Props extends StandardProps {
  children: string
}

const useStyles = makeStyles<Theme, Props>(styles, { name: 'PicassoMarkdown' })

const Markdown = (props: Props): JSX.Element => {
  const { children, classes: externalClasses } = props

  const classes = mergeClasses(useStyles(props), externalClasses)

  return <ReactMarkdown className={classes.root}>{children}</ReactMarkdown>
}

Markdown.displayName = 'Markdown'

export default Markdown
