import { Breadcrumbs } from '../Breadcrumbs'
import { BreadcrumbsItem } from '../BreadcrumbsItem'

type BreadcrumbsCompoundType = typeof Breadcrumbs & {
  Item: typeof BreadcrumbsItem
}

export const BreadcrumbsCompound: BreadcrumbsCompoundType = Object.assign(
  Breadcrumbs,
  {
    Item: BreadcrumbsItem,
  }
)
