import React from 'react'

import Typography from '../../../Typography'
import Container from '../../../Container'
import List from '../../../List'
import ListItem from '../../../ListItem'

const Paragraph: React.FunctionComponent = ({ children }) => (
  <Typography size='small'>{children}</Typography>
)
const Strong: React.FunctionComponent = ({ children }) => (
  <Typography size='small' as='strong' weight='semibold'>
    {children}
  </Typography>
)
const Italic: React.FunctionComponent = ({ children }) => (
  <Typography size='small' as='em'>
    {children}
  </Typography>
)
const Heading: React.FunctionComponent = ({ children }) => (
  <Container top='xsmall'>
    <Typography as='h3' variant='heading' size='medium'>
      {children}
    </Typography>
  </Container>
)
const ListUnordered: React.FunctionComponent = ({ children }) => (
  <List variant='unordered'>{children}</List>
)
const ListOrdered: React.FunctionComponent = ({ children }) => (
  <List variant='ordered'>{children}</List>
)

const componentMap = {
  p: Paragraph,
  strong: Strong,
  em: Italic,
  h3: Heading,
  li: ListItem as React.FunctionComponent,
  ol: ListOrdered,
  ul: ListUnordered
} as const

const picassoMapper = (child: React.ReactNode): React.ReactNode => {
  if (!React.isValidElement(child)) {
    return child
  }

  const type =
    componentMap[child.type as keyof typeof componentMap] || child.type
  const children = child.props.children.map(picassoMapper)

  return React.createElement(type, {}, children)
}

const mapToPicasso = (
  jsx: React.DetailedReactHTMLElement<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >
): React.ReactNodeArray | React.ReactNode => {
  const children = jsx.props.children

  if (!Array.isArray(children)) {
    return children
  }

  const mappedChildren = Array.isArray(children)
    ? children.map(picassoMapper)
    : children

  return mappedChildren
}

export default mapToPicasso
