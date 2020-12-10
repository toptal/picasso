import { SidebarItem } from '../SidebarItem'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  SidebarItem,
  'Sidebar.Item',
  undefined,
  {
    icon: {
      name: 'icon',
      type: 'ReactElement',
      description: 'Pass icon to be used as part of item'
    },
    selected: {
      name: 'selected',
      defaultValue: 'false',
      type: 'boolean',
      description: 'Highlights the item as selected'
    },
    disabled: {
      name: 'disabled',
      type: 'boolean',
      description: 'Whether to render disabled item'
    },
    collapsible: {
      name: 'collapsible',
      defaultValue: 'false',
      type: 'boolean',
      description: 'If item has menu defines can menu be collapsed'
    },
    menu: {
      name: 'menu',
      type: 'ReactElement',
      description: 'Renders nested sidebar menu'
    },
    onClick: {
      name: 'onClick',
      type: {
        name: 'function',
        description:
          '(event: React.MouseEvent<HTMLElement, MouseEvent>) => void'
      },
      description: 'Callback when item is clicked'
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
      description: 'Component name to render the menu item as'
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
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Sidebar Item')
    .addExample('SidebarItem/story/Links.example.tsx', {
      title: 'Sidebar.Item as a Link',
      description: `
Most of the time you would use Sidebar.Item as a router Link. This is how to do it.
`
    })
    .addExample('SidebarItem/story/Icons.example.tsx', 'Icons')
    .addExample('SidebarItem/story/Collapsible.example.tsx', {
      title: 'Collapsible Sidebar.Item',
      description:
        'Sidebar.Item has capability to render nested Sidebar.Menu with collapsible prop',
      effect: async (testPage, makeScreenshot) => {
        await testPage.click('[test-id="Referrals"]')
        await testPage.waitFor(100)
        await makeScreenshot()
      }
    })
    .addExample('SidebarItem/story/DefaultExpanded.example.tsx', {
      title: 'Expanded by default',
      description:
        'When a nested Sidebar.Item is selected, it automatically expands the menu.'
    })
    .addExample('SidebarItem/story/Disabled.example.tsx', 'Disabled')
)

export default {
  chapter,
  componentDocs
}
