import PicassoBook from '~/.storybook/components/PicassoBook'

import counterBlockGroupStory from '../../CounterBlockGroup/story'
import { CounterBlock } from '../CounterBlock'

const page = PicassoBook.createPage(
  'CounterBlock',
  'Allows displaying counters.',
  'Lab'
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: CounterBlock,
    name: 'CounterBlock',
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
        name: 'color',
        type: {
          name: 'enum',
          enums: [
            '"blue"',
            '"green"',
            '"red"',
            '"yellow"',
            '"light-grey"',
            '"grey"',
            '"dark-grey"',
            '"black"',
            '"inherit"'
          ]
        },
        description: "The color of counter's title"
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
  .addComponentDocs(counterBlockGroupStory.componentDocs)

page
  .createChapter()
  .addExample('CounterBlock/story/Default.example.tsx', 'Default')
  .addExample('CounterBlock/story/Multiline.example.tsx', 'Multi-line')
  .addExample('CounterBlock/story/Routing.example.tsx', 'Routing')
