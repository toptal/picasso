import toH from 'hast-to-hyperscript'
import React, {
  useMemo,
  createElement,
  ReactElement,
  isValidElement,
  ReactNode,
  FC
} from 'react'

import { ASTType } from '../../types'
import Typography from '../../../Typography'
import Container from '../../../Container'
import List from '../../../List'
import ListItem from '../../../ListItem'

type Props = {
  children?: React.ReactNode
}

// List internaly passes another props to ListItem
const Li = ({ children, ...props }: Props) => (
  <ListItem {...props}>{children}</ListItem>
)

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

const componentMap: Record<string, FC> = {
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

  const mappedChildren = child.props.children?.map(picassoMapper) ?? null

  return createElement(type, { key: child.key }, mappedChildren)
}

const useRichText = (value: ASTType): ReactNode[] | ReactNode => {
  const mappedTextNodes = useMemo(() => {
    const { children } = value

    if (!children?.length) {
      return null
    }

    const isSingleChild = children.length === 1
    const reactElement = toH(createElement, value) as ReactElement

    if (isSingleChild) {
      return picassoMapper(reactElement)
    }

    // first node of tree is always "root",
    // which is transformed to wrapping div when children.length > 1
    // when single children, there is no wrapping div and it returns textNode right away
    const textNodes = reactElement.props.children

    return textNodes.map(picassoMapper)
  }, [value])

  return mappedTextNodes
}

export default useRichText
