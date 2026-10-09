import type { ReactNode } from 'react'
import React, {
  Children,
  isValidElement,
  useEffect,
  useReducer,
  useState,
} from 'react'
import type { HelmetProps } from '@toptal/picasso-provider'
import { Helmet } from '@toptal/picasso-provider'
import { flattenFragments } from '@toptal/picasso-shared'
import { isReact19OrNewer } from '@toptal/picasso-utils'

import type { TitleEntry } from './title-registry'
import { register, resolveTitle, subscribe, update } from './title-registry'

export interface Props extends HelmetProps {
  /** content that goes to the document head */
  children?: ReactNode
}

// A `<title>` child is the helmet's title, and its other props are the
// title's attributes, as react-helmet-async reads it, inside a fragment too
const splitTitleChild = (children: ReactNode) => {
  let title: string | undefined
  let titleAttributes: HelmetProps['titleAttributes']
  const otherChildren = flattenFragments(children).filter(child => {
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.type === 'title'
    ) {
      const { children: text, ...attributes } = child.props

      title = Children.toArray(text).join('')
      titleAttributes = attributes

      return false
    }

    return true
  })

  return { title, titleAttributes, otherChildren }
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
    titleTemplate: titleTemplateProp,
    defaultTitle: defaultTitleProp,
    ...rest
  } = props
  const {
    title: childTitle,
    titleAttributes: childTitleAttributes,
    otherChildren,
  } = splitTitleChild(children)
  // A prop set to `undefined` still hides an outer helmet's value, as
  // react-helmet-async merges them, so the registry keeps it as `null`
  const own = (key: keyof TitleEntry, value: string | undefined) =>
    key in props ? value ?? null : undefined
  // As in react-helmet-async, a `<title>` child replaces the `title` prop
  const title = childTitle ?? own('title', titleProp)
  const titleTemplate = own('titleTemplate', titleTemplateProp)
  const defaultTitle = own('defaultTitle', defaultTitleProp)
  const [entry] = useState<TitleEntry>(() => ({}))
  const [, rerender] = useReducer((count: number) => count + 1, 0)

  useEffect(() => subscribe(rerender), [])
  useEffect(() => register(entry), [entry])
  useEffect(() => {
    update(entry, { title, titleTemplate, defaultTitle })
  }, [entry, title, titleTemplate, defaultTitle])

  // As in react-helmet-async, a `<title>` child's attributes replace the
  // `titleAttributes` prop. Only the helmet that renders the title applies
  // them, so an outer helmet's don't merge in
  return (
    <Helmet
      {...rest}
      title={resolveTitle(entry)}
      titleAttributes={childTitleAttributes ?? rest.titleAttributes}
    >
      {otherChildren}
    </Helmet>
  )
}

PlainPageHelmet.displayName = 'PageHelmet'
MergingPageHelmet.displayName = 'PageHelmet'

export const PageHelmet = isReact19OrNewer ? MergingPageHelmet : PlainPageHelmet

export default PageHelmet
