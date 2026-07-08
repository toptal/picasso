import React from 'react'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BaseProps } from '@toptal/picasso-shared'

import * as classes from './styles'

interface Props extends BaseProps {
  children: string
  className?: string
}

const Markdown = (props: Props): JSX.Element => {
  const { children, className } = props

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
