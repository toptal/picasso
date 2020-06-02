import BreadcrumbsItem from '../BreadcrumbsItem'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  BreadcrumbsItem,
  'Breadcrumbs.Item',
  'Breadcrumbs Item',
  {
    as: {
      name: 'as',
      type: {
        name: 'enum'
      },
      defaultValue: 'button',
      description:
        'The component used for the root node.\nEither a string to use a DOM element or a component.'
    },
    active: {
      name: 'active',
      type: 'boolean',
      description: 'Whether the item is active'
    }
  }
)

export default {
  componentDocs
}
