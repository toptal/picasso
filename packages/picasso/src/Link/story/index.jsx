import { Link } from '../Link'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Link',
  'The Link component allows you to easily customize anchor elements with your theme colors and typography styles.'
)

page.createTabChapter('Props').addComponentDocs({
  component: Link,
  name: 'Link',
  // react-docgen-typescript doesn't work with generics, so we have to generate this
  // documentation manually
  additionalDocs: {
    children: {
      name: 'children',
      type: 'ReactNode',
      description: 'Content of the component'
    },
    href: {
      name: 'href',
      type: 'string',
      description: 'Destination the link points to'
    },
    underline: {
      name: 'underline',
      type: {
        name: 'enum',
        enums: ['"none"', '"always"', '"hover"']
      },
      description: 'Controls when the link should have an underline'
    },
    onClick: {
      name: 'onClick',
      type: {
        name: 'function',
        description:
          '(event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void'
      },
      description: 'Callback invoked when component is clicked'
    },
    as: {
      name: 'as',
      type: {
        name: 'enum',
        enums: [
          '"symbol"',
          '"object"',
          '"style"',
          '"title"',
          '"a"',
          '"abbr"',
          '"address"',
          '"area"',
          '"article"',
          '"aside"',
          '"audio"',
          '"b"',
          '"base"',
          '"bdi"',
          '"bdo"',
          '"big"',
          '"blockquote"',
          '"body"',
          '"br"',
          '... 157 more ...'
        ]
      },
      defaultValue: 'a',
      description:
        'The component used for the root node.\nEither a string to use a DOM element or a component.'
    },
    variant: {
      name: 'variant',
      type: {
        name: 'enum',
        enums: ['"default"', '"action"']
      },
      defaultValue: 'default',
      description: "Either it's a regular link or an _action_"
    },
    color: {
      name: 'color',
      type: {
        name: 'enum',
        enums: ['"blue"', '"white"', '"black"']
      },
      defaultValue: 'blue',
      description: 'Controls color of the link'
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
    }
  }
})

page
  .createChapter()
  .addExample('Link/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('Link/story/Action.example.tsx', 'Action') // picasso-skip-visuals
  .addExample('Link/story/Underline.example.tsx', 'Underline') // picasso-skip-visuals
  .addExample('Link/story/FontSize.example.tsx', {
    title: 'Font size',
    description:
      "You can modify Link's font size by wrapping it in `Typography`"
  }) // picasso-skip-visuals
  .addExample('Link/story/Color.example.tsx', 'Color') // picasso-skip-visuals
  .addExample('Link/story/Routing.example.tsx', {
    title: 'Routing',
    description:
      'An example how to use `@toptal/picasso` Link with `react-router-dom` Link'
  }) // picasso-skip-visuals
