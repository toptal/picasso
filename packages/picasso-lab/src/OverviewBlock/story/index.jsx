import overviewBlockGroup from '../../OverviewBlockGroup/story'
import { OverviewBlock } from '../OverviewBlock'

import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'OverviewBlock',
  'Allows displaying counters.',
  'Lab'
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: OverviewBlock,
    name: 'OverviewBlock',
    // react-docgen-typescript doesn't work with generics, so we have to generate this
    // documentation manually
    additionalDocs: {
      children: {
        name: 'children',
        type: 'ReactNode',
        description: 'Content of the component'
      },
      as: {
        name: 'as',
        type: {
          name: 'enum'
        },
        defaultValue: 'button',
        description:
          'The component used for the root node.\nEither a string to use a DOM element or a component.'
      }
    }
  })
  .addComponentDocs(overviewBlockGroup.componentDocs)

page
  .createChapter()
  .addExample('OverviewBlock/story/Default.example.tsx', 'Default')
