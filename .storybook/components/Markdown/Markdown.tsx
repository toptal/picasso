import React from 'react'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BaseProps } from '@toptal/picasso-shared'
import { styled } from '@mui/material/styles'

const StyledReactMarkdown = styled(ReactMarkdown)(() => ({
  '& code': {
    backgroundColor: 'rgb(236, 236, 236, 0.5)',
    borderRadius: '0.4em',
    padding: '0.3em 0.7em',
    fontWeight: 400,
    fontSize: '0.8em',
    fontFamily:
      "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace",
  },
  '& p:first-child': {
    marginTop: 0,
  },
  '& p:last-child': {
    marginBottom: 0,
  },
  '& pre': {
    backgroundColor: 'rgb(236, 236, 236, 0.5)',

    '& code': {
      padding: '0em',
      backgroundColor: 'initial',
    },
  },
}))

interface Props extends BaseProps {
  children: string
}

const Markdown = (props: Props): JSX.Element => {
  const { children } = props

  return (
    <StyledReactMarkdown remarkPlugins={[remarkGfm]}>
      {children}
    </StyledReactMarkdown>
  )
}

Markdown.displayName = 'Markdown'

export default Markdown
