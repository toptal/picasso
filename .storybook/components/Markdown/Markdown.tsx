import React from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BaseProps } from '@toptal/picasso-shared'

import useStyles from './styles'

interface Props extends BaseProps {
  children: string
}

const Markdown = (props: Props): JSX.Element => {
  const { children } = props

  const { classes } = useStyles()

  return (
    <ReactMarkdown className={classes.root} remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  )
}

Markdown.displayName = 'Markdown'

export default Markdown
