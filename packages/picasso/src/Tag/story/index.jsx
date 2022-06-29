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

    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/29d4c2d1-d73a-4998-8d4a-5e007e3374aa?collectionLayerId=c00f3d0a-271f-480e-a5d0-f52b38c0740b&mode=design&present=true'
    )}
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
  .addExample('Tag/story/Default.example.tsx', 'Default')
  .addExample('Tag/story/Variants.example.tsx', 'Variants')
  .addExample('Tag/story/Checkable.example.tsx', {
    title: 'Checkable',
    takeScreenshot: false,
  })

page.connect(tagGroupStory.chapter)
page.connect(tagRectangularStory.chapter)
