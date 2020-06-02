import overviewBlockGroupStory from '../../OverviewBlockGroup/story'
import { OverviewBlock } from '../OverviewBlock'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Lab').createPage(
  'OverviewBlock',
  'Allows displaying counters.'
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
      value: {
        name: 'value',
        type: 'string',
        description: 'Counter value'
      },
      title: {
        name: 'title',
        type: 'string',
        description: 'Counter title'
      },
      color: {
        name: 'variant',
        type: {
          name: 'enum',
          enums: [
            "'value-red'",
            "'value-green'",
            "'value-blue'",
            "'value-yellow'",
            "'label-red'",
            "'label-green'",
            "'label-blue'",
            "'label-yellow'"
          ]
        },
        description: 'The color variant'
      },
      as: {
        name: 'as',
        type: {
          name: 'enum'
        },
        defaultValue: 'button',
        description:
          'The component used for the root node.\nEither a string to use a DOM element or a component.'
      },
      onClick: {
        name: 'onClick',
        type: {
          name: 'function',
          description: '(event: MouseEvent) => void'
        },
        description: 'Callback invoked when component is clicked'
      }
    }
  })
  .addComponentDocs(overviewBlockGroupStory.componentDocs)

page
  .createChapter()
  .addExample('OverviewBlock/story/Default.example.tsx', 'Default')
  .addExample('OverviewBlock/story/Text.example.tsx', 'Text')
  .addExample('OverviewBlock/story/Number.example.tsx', 'Number')
  .addExample('OverviewBlock/story/Multiline.example.tsx', 'Multi-line')
  .addExample('OverviewBlock/story/Routing.example.tsx', 'Routing')
