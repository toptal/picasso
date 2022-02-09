import React, {
  createElement,
  isValidElement,
  ReactElement,
  ReactNode,
  ReactNodeArray
} from 'react'

import Typography from '../../../Typography'
import Container from '../../../Container'
import List from '../../../List'
import ListItem from '../../../ListItem'

type Props = {
  children?: React.ReactNode
}

const Li = ({ children }: Props) => <ListItem>{children}</ListItem>

/* eslint-disable id-length */
const P = ({ children }: Props) => (
  <Typography size='small'>{children}</Typography>
)
const Strong = ({ children }: Props) => (
  <Typography size='small' as='strong' weight='semibold'>
    {children}
  </Typography>
)
const Em = ({ children }: Props) => (
  <Typography size='small' as='em'>
    {children}
  </Typography>
)
const H3 = ({ children }: Props) => (
  <Container top='xsmall'>
    <Typography as='h3' variant='heading' size='medium'>
      {children}
    </Typography>
  </Container>
)
const Ul = ({ children }: Props) => <List variant='unordered'>{children}</List>
const Ol = ({ children }: Props) => <List variant='ordered'>{children}</List>

const componentMap = {
  p: P,
  strong: Strong,
  em: Em,
  h3: H3,
  li: Li,
  ol: Ol,
  ul: Ul
} as const

const picassoMapper = (child: ReactNode): ReactNode => {
  if (!isValidElement(child)) {
    return child
  }

  const type =
    componentMap[child.type as keyof typeof componentMap] || child.type
  const mappedChildren = child.props.children.map(picassoMapper)

  return createElement(type, { key: child.key }, mappedChildren)
}

const mapToPicasso = (
  jsx: ReactElement<{ children: ReactNodeArray }>
): ReactNodeArray => {
  const children = jsx.props.children

  return children.map(picassoMapper)
}

export default mapToPicasso
