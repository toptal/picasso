import toH from 'hast-to-hyperscript'
import type { ReactElement, ReactNode, FC } from 'react'
import type { Theme } from '@material-ui/core/styles'
import React, { useMemo, createElement, isValidElement } from 'react'
import { Container } from '@toptal/picasso-container'
import { Typography } from '@toptal/picasso-typography'
import { List, ListItem } from '@toptal/picasso-list'
import { Link } from '@toptal/picasso-link'
import { makeStyles } from '@material-ui/core'

import type { ASTType } from '../../types'
import { Emoji, Image, Code, CodeBlock } from '../../components'
import { isCustomEmoji } from '../../../utils'
import styles from './styles'

const useStyles = makeStyles<Theme>(styles, { name: 'PicassoRichText' })

type Props = {
  children?: React.ReactNode
}

// List internaly passes another props to ListItem
const Li = ({ children, ...props }: Props) => (
  <ListItem {...props}>{children}</ListItem>
)

/* eslint-disable id-length */
const P = ({ children }: Props) => (
  <Typography size='medium'>{children}</Typography>
)
const Strong = ({ children }: Props) => (
  <Typography size='inherit' as='strong' weight='semibold' color='inherit'>
    {children}
  </Typography>
)

const Em = ({ children }: Props) => (
  <Typography size='inherit' as='em' color='inherit'>
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
const A = ({ children, ...props }: Props) => {
  const classes = useStyles()

  return (
    <Link {...props} className={classes.visitedLinkChild}>
      {children}
    </Link>
  )
}

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
