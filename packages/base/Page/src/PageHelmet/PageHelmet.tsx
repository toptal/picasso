import type { ReactNode } from 'react'
import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useReducer,
  useState,
} from 'react'
import type { HelmetProps } from '@toptal/picasso-provider'
import { Helmet } from '@toptal/picasso-provider'
import { isReact19OrNewer } from '@toptal/picasso-utils'

import type { TitleEntry } from './title-registry'
import { register, resolveTitle, subscribe, update } from './title-registry'

export interface Props extends HelmetProps {
  /** content that goes to the document head */
  children?: ReactNode
}

// react-helmet-async reads the children of fragments as its own. The others
// are keyed by the fragment they came from, so they stay unique
const flattenFragments = (children: ReactNode, keyPrefix = ''): ReactNode[] =>
  Children.toArray(children).flatMap(child => {
    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return [child]
    }

    if (child.type === Fragment) {
      return flattenFragments(child.props.children, `${keyPrefix}${child.key}`)
    }

    return keyPrefix
      ? [cloneElement(child, { key: `${keyPrefix}${child.key}` })]
      : [child]
  })

// A `<title>` child is the helmet's title, as react-helmet-async reads it
const splitTitleChild = (children: ReactNode) => {
  let title: string | undefined
  const otherChildren = flattenFragments(children).filter(child => {
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === 'title'
    ) {
      title = Children.toArray(child.props.children).join('')

      return false
    }

    return true
  })

  return { title, otherChildren }
}

const PlainPageHelmet = (props: Props): React.ReactElement => {
  const { children, ...rest } = props

  return <Helmet {...rest}>{children}</Helmet>
}

// On React 19, react-helmet-async renders each helmet's own `<title>` for
// React to hoist, so a layout's `titleTemplate` never reached a page's
// `title`. The helmets merge their titles here instead, and only one renders
const MergingPageHelmet = (props: Props): React.ReactElement => {
  const {
    children,
    title: titleProp,
    titleTemplate,
    defaultTitle,
    ...rest
  } = props
  const { title: childTitle, otherChildren } = splitTitleChild(children)
  // As in react-helmet-async, a `<title>` child replaces the `title` prop
  const title = childTitle ?? titleProp
  const [entry] = useState<TitleEntry>(() => ({}))
  const [, rerender] = useReducer((count: number) => count + 1, 0)

  useEffect(() => subscribe(rerender), [])
  useEffect(() => {
    update(entry, { title, titleTemplate, defaultTitle })
  }, [entry, title, titleTemplate, defaultTitle])
  useEffect(() => register(entry), [entry])

  return (
    <Helmet {...rest} title={resolveTitle(entry)}>
      {otherChildren}
    </Helmet>
  )
}

PlainPageHelmet.displayName = 'PageHelmet'
MergingPageHelmet.displayName = 'PageHelmet'

export const PageHelmet = isReact19OrNewer ? MergingPageHelmet : PlainPageHelmet

export default PageHelmet
