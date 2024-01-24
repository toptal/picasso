import buttonGroupStory from '../../ButtonGroup/story'
import buttonCircularStory from '../../ButtonCircular/story'
import buttonActionStory from '../../ButtonAction/story'
import buttonSplitStory from '../../ButtonSplit/story'
import buttonCheckboxStory from '../../ButtonCheckbox/story'
import buttonRadioStory from '../../ButtonRadio/story'
import { Button } from '../Button'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Button',
  `
    A Button indicates a possible user action.

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/e48c56eb-28d6-4770-abaa-ebff35e02833?collectionLayerId=d7452441-b6bd-4625-8303-e66e17e10304&mode=design&present=true'
    )}

    ${PicassoBook.createSourceLink(__filename)}
   `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Button,
    additionalDocs: {
      as: {
        name: 'as',
        type: {
          name: 'enum',
          enums: [
            '"symbol"',
            '"abbr"',
            '"address"',
            '"article"',
            '"aside"',
            '"b"',
            '"bdi"',
            '"bdo"',
            '"big"',
            '"blockquote"',
            '"caption"',
            '"cite"',
            '"code"',
            '"dd"',
            '"del"',
            '"details"',
            '"dfn"',
            '"dt"',
            '"em"',
            '"figcaption"',
            '... 95 more ...',
          ],
        },
        description:
          'The component used for the root node. Either a string to use a DOM element or a component.',
        defaultValue: 'button',
      },
    },
    name: 'Button',
  })
  .addComponentDocs(buttonCircularStory.componentDocs)
  .addComponentDocs(buttonActionStory.componentDocs)
  .addComponentDocs(buttonGroupStory.componentDocs)
  .addComponentDocs(buttonSplitStory.componentDocs)
  .addComponentDocs(buttonCheckboxStory.componentDocs)
  .addComponentDocs(buttonRadioStory.componentDocs)

page
  .createChapter()
  .addExample('Button/story/Default.example.tsx', 'Default', 'base/Button')
  .addExample('Button/story/Variants.example.tsx', 'Variants', 'base/Button')
  .addExample('Button/story/States.example.tsx', 'States', 'base/Button')
  .addExample(
    'Button/story/Disabled.example.tsx',
    {
      title: 'Disabled',
      description:
        'The button shows that currently unable to be interacted with',
    },
    'base/Button'
  )
  .addExample('Button/story/Sizes.example.tsx', 'Sizes', 'base/Button')
  .addExample('Button/story/FullWidth.example.tsx', 'Full width', 'base/Button')
  .addExample(
    'Button/story/IconButtonsWithText.example.tsx',
    'Button with text and Icon',
    'base/Button'
  )
  .addExample(
    'Button/story/Loading.example.tsx',
    'Button with loading state',
    'base/Button'
  )
  .addExample(
    'Button/story/Augmentation.example.tsx',
    {
      title: 'Augmentation',
      description:
        'Example show augmentation with Picasso Link component. You can use Link component from react-router-dom or some other custom component.',
    },
    'base/Button'
  )

page.connect(buttonCircularStory.chapter)
page.connect(buttonActionStory.chapter)
page.connect(buttonGroupStory.chapter)
page.connect(buttonSplitStory.chapter)
page.connect(buttonCheckboxStory.chapter)
page.connect(buttonRadioStory.chapter)
