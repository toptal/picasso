import React from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BaseProps } from '@toptal/picasso-shared'
import { makeStyles, Theme } from '@material-ui/core/styles'

import styles from './styles'

interface Props extends BaseProps {
  children: string
  className?: string
}

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoMarkdown' })

const Markdown = (props: Props): JSX.Element => {
  const { children, className } = props

  const classes = useStyles()

  return (
    <ReactMarkdown
      className={cx(classes.root, className)}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  )
}

export const createMarkdownPage = (markdown: string) => () =>
  <Markdown className='markdown-body'>{markdown}</Markdown>

Markdown.displayName = 'Markdown'

export default Markdown
