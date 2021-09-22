import buttonGroupStory from '../../ButtonGroup/story'
import buttonCircularStory from '../../ButtonCircular/story'
import buttonActionStory from '../../ButtonAction/story'
import buttonSplitStory from '../../ButtonSplit/story'
import { Button } from '../Button'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Button',
  `
    A Button indicates a possible user action.

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/e48c56eb-28d6-4770-abaa-ebff35e02833?collectionLayerId=d7452441-b6bd-4625-8303-e66e17e10304&mode=design&present=true'
    )}
   `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Button,
    additionalDocs: {
      children: {
        name: 'children',
        type: 'ReactNode',
        description: 'Content of Button component',
        defaultValue: 'null'
      },
      className: {
        name: 'className',
        type: 'string',
        description: 'Classnames applied to root element'
      },
      style: {
        name: 'style',
        type: 'CSSProperties',
        description: 'Style applied to root element'
      },
      title: {
        name: 'title',
        type: 'string',
        description: 'HTML title of Button component'
      },
      onClick: {
        name: 'onClick',
        type: {
          name: 'function',
          description:
            '(event: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void'
        },
        description: 'Callback invoked when component is clicked'
      },
      size: {
        name: 'size',
        type: {
          name: 'enum',
          enums: ['medium', 'large', 'small']
        },
        defaultValue: 'medium',
        description: 'A button can have different sizes'
      },
      icon: {
        name: 'icon',
        type: 'ReactElement',
        description: "Add an `<Icon />` along Button's children"
      },
      active: {
        name: 'active',
        type: 'boolean',
        description: 'Show button in the active state (left mouse button down)',
        defaultValue: 'false'
      },
      disabled: {
        name: 'disabled',
        type: 'boolean',
        description: 'Disables button',
        defaultValue: 'false'
      },
      fullWidth: {
        name: 'fullWidth',
        type: 'boolean',
        description: 'Take the full width of a container',
        defaultValue: 'false'
      },
      hovered: {
        name: 'hovered',
        type: 'boolean',
        description: 'Set hovered style for the button',
        defaultValue: 'false'
      },
      circular: {
        name: 'circular',
        type: 'boolean',
        description: 'Circular style of Button component',
        defaultValue: 'false'
      },
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
            '... 95 more ...'
          ]
        },
        description:
          'The component used for the root node. Either a string to use a DOM element or a component.',
        defaultValue: 'button'
      },
      iconPosition: {
        name: 'iconPosition',
        description: 'Icon can be positioned on the left or right',
        type: {
          name: 'enum',
          enums: ['left', 'right']
        },
        defaultValue: 'left'
      },
      loading: {
        name: 'loading',
        type: 'boolean',
        description: 'Shows a loading indicator and disables click events',
        defaultValue: 'false'
      },
      variant: {
        name: 'variant',
        defaultValue: 'primary',
        description: 'The variant to use',
        type: {
          name: 'enum',
          enums: ['primary', 'positive', 'negative', 'secondary', 'transparent']
        }
      },
      value: {
        name: 'value',
        description: 'HTML Value of Button component',
        type: {
          name: 'enum',
          enums: ['string', 'number']
        }
      },
      type: {
        name: 'type',
        description: 'HTML type of Button component',
        type: {
          name: 'enum',
          enums: ['button', 'reset', 'submit']
        },
        defaultValue: 'button'
      },
      titleCase: {
        name: 'titleCase',
        description: 'Defines if the text should be transformed to title case',
        type: 'boolean'
      }
    },
    name: 'Button'
  })
  .addComponentDocs(buttonCircularStory.componentDocs)
  .addComponentDocs(buttonActionStory.componentDocs)
  .addComponentDocs(buttonGroupStory.componentDocs)
  .addComponentDocs(buttonSplitStory.componentDocs)

page
  .createChapter()
  .addExample('Button/story/Default.example.tsx', 'Default')
  .addExample('Button/story/Variants.example.tsx', 'Variants')
  .addExample('Button/story/States.example.tsx', 'States')
  .addExample('Button/story/Disabled.example.tsx', {
    title: 'Disabled',
    description: 'The button shows that currently unable to be interacted with'
  })
  .addExample('Button/story/Sizes.example.tsx', 'Sizes')
  .addExample('Button/story/FullWidth.example.tsx', 'Full width')
  .addExample(
    'Button/story/IconButtonsWithText.example.tsx',
    'Button with text and Icon'
  )
  .addExample('Button/story/Loading.example.tsx', 'Button with loading state')
  .addExample('Button/story/Augmentation.example.tsx', {
    title: 'Augmentation',
    description:
      'Example show augmentation with Picasso Link component. You can use Link component from react-router-dom or some other custom component.'
  })

page.connect(buttonCircularStory.chapter)
page.connect(buttonActionStory.chapter)
page.connect(buttonGroupStory.chapter)
page.connect(buttonSplitStory.chapter)
