import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Button } from '../Button'

const page = PicassoBook.createPage(
  'Button',
  'A Button indicates a possible user action'
)

page
  .addComponentDocs(Button, {
    variant: {
      type: 'enum',
      enums: [
        'primary',
        'secondary',
        'flat',
        'basic',
        'positive',
        'negative',
        'default'
      ]
    },
    size: {
      type: 'enum',
      defaultValue: 'medium',
      enums: ['small', 'medium', 'large']
    },
    iconPosition: {
      type: 'enum',
      enums: ['left', 'right']
    },
    onClick: {
      type: {
        name: 'function',
        description:
          '(event: React.MouseEvent<HTMLElement, MouseEvent>) => void | undefined'
      }
    }
  })
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
