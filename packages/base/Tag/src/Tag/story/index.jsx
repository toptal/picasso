import tagGroupStory from '../../TagGroup/story'
import tagRectangularStory from '../../TagRectangular/story'
import { Tag } from '../Tag'
import PicassoBook from '~/.storybook/components/PicassoBook'
import TagConnection from '../../TagConnection'
import TagCheckable from '../../TagCheckable'

const page = PicassoBook.section('Components').createPage(
  'Tag',
  `
    Tags are used to describe other topics, including textareas,
    form fields, users, and more. By default, tags are read-only UI elements.
    They are used to surface important information about a topic. Tags may also
    be used to convey status, or used within a group to show selection.

    ${PicassoBook.createSourceLink(__filename)}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Tag,
    additionalDocs: {
      onDelete: {
        type: {
          description: '(() => void) | undefined',
        },
      },
    },
    name: 'Tag',
  })
  .addComponentDocs(tagGroupStory.componentDocs)
  .addComponentDocs(tagRectangularStory.componentDocs)
  .addComponentDocs({
    component: TagConnection,
    name: 'Tag.Connection',
    description: 'Used inside endAdornment to showcase number of connections',
  })
  .addComponentDocs({
    component: TagCheckable,
    name: 'Tag.Checkable',
    description: 'Used when you need toggable Tag',
  })

page
  .createChapter()
  .addExample('Tag/story/Default.example.tsx', 'Default', 'base/Tag')
  .addExample('Tag/story/Variants.example.tsx', 'Variants', 'base/Tag')
  .addExample(
    'Tag/story/Checkable.example.tsx',
    {
      title: 'Checkable',
      takeScreenshot: false,
    },
    'base/Tag'
  )

page.connect(tagGroupStory.chapter)
page.connect(tagRectangularStory.chapter)
