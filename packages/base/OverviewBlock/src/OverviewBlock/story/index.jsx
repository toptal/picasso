import overviewBlockGroupStory from '../../OverviewBlockGroup/story'
import overviewBlockRowStory from '../../OverviewBlockRow/story'
import { OverviewBlock } from '../OverviewBlock'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'OverviewBlock',
  `Allows displaying counters.

  ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: OverviewBlock,
    name: 'OverviewBlock',
    additionalDocs: {
      as: {
        name: 'as',
        type: {
          name: 'ElementType',
        },
        description:
          'Component used for the root node. Either a string to use a DOM element or a component.',
        defaultValue: 'button',
      },
    },
  })
  .addComponentDocs(overviewBlockGroupStory.componentDocs)
  .addComponentDocs(overviewBlockRowStory.componentDocs)

page
  .createChapter()
  .addExample(
    'OverviewBlock/story/Default.example.tsx',
    'Default',
    'base/OverviewBlock'
  )
  .addExample(
    'OverviewBlock/story/Text.example.tsx',
    'Text',
    'base/OverviewBlock'
  )
  .addExample(
    'OverviewBlock/story/Number.example.tsx',
    'Number',
    'base/OverviewBlock'
  )
  .addExample(
    'OverviewBlock/story/Multiline.example.tsx',
    'Multi-line',
    'base/OverviewBlock'
  )
  .addExample(
    'OverviewBlock/story/Routing.example.tsx',
    'Routing',
    'base/OverviewBlock'
  )
  .addExample(
    'OverviewBlock/story/CustomLabel.example.tsx',
    'Custom label',
    'base/OverviewBlock'
  )

page.connect(overviewBlockGroupStory.chapter)
