import toH from 'hast-to-hyperscript'
import type { ReactElement, ReactNode, FC } from 'react'
import React, { useMemo, createElement, isValidElement } from 'react'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { List, ListItem } from '@toptal/picasso-list'
import { Link } from '@toptal/picasso-link'
import { twMerge } from '@toptal/picasso-tailwind-merge'

import type { ASTType } from '../../types'
import { Emoji, Image, Code, CodeBlock } from '../../components'
import { isCustomEmoji } from '../../../utils'

type Props = {
  children?: React.ReactNode
  className?: string
}

// List internaly passes another props to ListItem
const Li = ({ children, ...props }: Props) => (
  <ListItem {...props}>{children}</ListItem>
)

/* eslint-disable id-length */
const P = ({ children, ...props }: Props) => (
  <Typography size='medium' {...props}>
    {children}
  </Typography>
)
const Strong = ({ children, ...props }: Props) => (
  <Typography
    size='inherit'
    as='strong'
    weight='semibold'
    color='inherit'
    {...props}
  >
    {children}
  </Typography>
)

const Em = ({ children, ...props }: Props) => (
  <Typography size='inherit' as='em' color='inherit' {...props}>
    {children}
  </Typography>
)

const H3 = ({ children, ...props }: Props) => (
  <Container top='xsmall' {...props}>
    <Typography as='h3' variant='heading' size='medium'>
      {children}
    </Typography>
  </Container>
)

const Ul = ({ children, ...props }: Props) => (
  <List variant='unordered' {...props}>
    {children}
  </List>
)
const Ol = ({ children, ...props }: Props) => (
  <List variant='ordered' {...props}>
    {children}
  </List>
)
const A = ({ children, className, ...props }: Props) => (
  <Link
    {...props}
    className={twMerge(
      '[&:visited>strong]:text-purple-500 [&:visited>em]:text-purple-500',
      className
    )}
  >
    {children}
  </Link>
)

const Img = ({ ...props }: Props) =>
  isCustomEmoji(props) ? <Emoji {...props} /> : <Image {...props} />

const componentMap: Record<string, FC> = {
  p: P,
  strong: Strong,
  em: Em,
  h3: H3,
  li: Li,
  ol: Ol,
  ul: Ul,
  a: A,
  img: Img,
  code: Code,
  pre: CodeBlock,
} as const

const picassoMapper = (child: ReactNode): ReactNode => {
  if (!isValidElement(child)) {
    return child
  }

  const type =
    componentMap[child.type as keyof typeof componentMap] || child.type

  const mappedChildren = child.props.children?.map(picassoMapper) ?? null

  return createElement(type, { ...child.props, key: child.key }, mappedChildren)
}

const useRichText = (value: ASTType): ReactNode[] | ReactNode => {
  const mappedTextNodes = useMemo(() => {
    const { children: astChildren } = value

    if (!astChildren?.length) {
      return null
    }

    const isSingleChild = astChildren.length === 1
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
