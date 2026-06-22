import figma from '@figma/code-connect'
import React from 'react'
import { Breadcrumbs, BreadcrumbsItem } from '@toptal/picasso-breadcrumbs'

const URL =
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=122-2162'

// "Style=Current"  → last item is active (current page, non-clickable)
// "Style=Parents"  → all items are parent navigation links, no active item
// "# of items"     → number of BreadcrumbsItem children

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Current', '# of items': '2 items' },
  example: () => (
    <Breadcrumbs>
      <BreadcrumbsItem active={false}>Home</BreadcrumbsItem>
      <BreadcrumbsItem active>Current Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Current', '# of items': '3 items' },
  example: () => (
    <Breadcrumbs>
      <BreadcrumbsItem active={false}>Home</BreadcrumbsItem>
      <BreadcrumbsItem active={false}>Section</BreadcrumbsItem>
      <BreadcrumbsItem active>Current Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Current', '# of items': '4 items' },
  example: () => (
    <Breadcrumbs>
      <BreadcrumbsItem active={false}>Home</BreadcrumbsItem>
      <BreadcrumbsItem active={false}>Section</BreadcrumbsItem>
      <BreadcrumbsItem active={false}>Subsection</BreadcrumbsItem>
      <BreadcrumbsItem active>Current Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
})

figma.connect(Breadcrumbs, URL, {
  variant: { Style: 'Current', '# of items': '5 items' },
  example: () => (
    <Breadcrumbs>
      <BreadcrumbsItem active={false}>Home</BreadcrumbsItem>
      <BreadcrumbsItem active={false}>Section</BreadcrumbsItem>
      <BreadcrumbsItem active={false}>Subsection</BreadcrumbsItem>
      <BreadcrumbsItem active={false}>Detail</BreadcrumbsItem>
      <BreadcrumbsItem active>Current Page</BreadcrumbsItem>
    </Breadcrumbs>
  ),
})
