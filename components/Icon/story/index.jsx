import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Icon, decapitalizeFirstLetter } from '../Icon'
import * as icons from '../index'

const page = PicassoBook.createPage(
  'Icon',
  `Labels are used to describe other topics, including textareas,
  form fields, users, and more. By default, labels are read-only UI elements.
  They are used to surface important information about a topic. Labels may also
  be used to convey status, or used within a group to show selection.`
)

page
  .addComponentDocs(Icon, {
    name: {
      type: 'enum',
      enums: Object.keys(icons).map(decapitalizeFirstLetter)
    }
  })
  .addExample('Icon/story/Icon.example.jsx', {
    title: 'Icon',
    description: 'Component to mount icon'
  })
  .addExample('Icon/story/Size.example.jsx', {
    title: 'Size',
    description:
      'Recommended way to use `font-size` to adjust the icon size, but also you can specify `height` and `width` within styles'
  })
  .addExample('Icon/story/Color.example.jsx', 'Color')

/*
 * TODO: Next part is broken because currently we don't support full compilation of examples
 * page.addExample('Icon/story/Available.example.jsx', 'Available Icons') // picasso-skip-visuals
 */
