import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  'Button',
  'A Button indicates a possible user action'
)

const docs = [
  {
    name: 'active',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Show it currently has active user selection'
  },
  {
    name: 'children',
    type: 'node',
    description: 'Content of Button component'
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Take the full width of a container'
  },
  {
    name: 'icon',
    type: 'node',
    description: 'Add an <Icon /> along Button`s children'
  },
  {
    name: 'iconPosition',
    type: 'enum',
    enums: ['left', 'right'],
    description: 'Icon can be positioned on the left or right'
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description: 'A button can show a loading indicator'
  },
  {
    name: 'size',
    type: 'enum',
    enums: ['small', 'medium', 'large'],
    defaultValue: 'medium',
    description: 'A button can have different sizes'
  },
  {
    name: 'variant',
    type: 'enum',
    enums: [
      'primary',
      'secondary',
      'flat',
      'basic',
      'positive',
      'negative',
      'default'
    ],
    defaultValue: 'default',
    description: 'The variant to use'
  }
]

page
  .addDocs(docs)
  .addExample('Button/story/Basic.example.jsx', 'Basic')
  .addExample('Button/story/Variants.example.jsx', 'Variants')
  .addExample('Button/story/States.example.jsx', 'States')
  .addExample('Button/story/Disabled.example.jsx', {
    title: 'Disabled',
    description: 'The button shows that currently unable to be interacted with'
  })
  .addExample('Button/story/Sizes.example.jsx', 'Sizes')
  .addExample('Button/story/FullWidth.example.jsx', 'Full width')
  .addExample('Button/story/IconButtons.example.jsx', 'Button with Icon')
  .addExample(
    'Button/story/IconButtonsWithText.example.jsx',
    'Button with text and Icon'
  )
  .addExample('Button/story/Loading.example.jsx', 'Button with loading state')
