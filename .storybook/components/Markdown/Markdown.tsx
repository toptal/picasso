import React from 'react'

import ReactMarkdown from 'react-markdown'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'

interface Props extends BaseProps {
  children: string
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoMarkdown' })

const Markdown = (props: Props): JSX.Element => {
  const { children } = props

  const classes = useStyles()

  return <ReactMarkdown className={classes.root}>{children}</ReactMarkdown>
}

Markdown.displayName = 'Markdown'

export default Markdown
