import tagGroupStory from '../../TagGroup/story'
import tagRectangularStory from '../../TagRectangular/story'
import { Tag } from '../Tag'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Tag',
  `Tags are used to describe other topics, including textareas,
    form fields, users, and more. By default, tags are read-only UI elements.
    They are used to surface important information about a topic. Tags may also
    be used to convey status, or used within a group to show selection.`
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Tag,
    additionalDocs: {
      onDelete: {
        type: {
          description: '(() => void) | undefined'
        }
      }
    },
    name: 'Tag'
  })
  .addComponentDocs(tagGroupStory.componentDocs)
  .addComponentDocs(tagRectangularStory.componentDocs)

page
  .createChapter()
  .addExample('Tag/story/Variants.example.tsx', 'Variants')
  .addExample('Tag/story/Dismissable.example.tsx', 'Dismissable')
  .addExample('Tag/story/WithIcon.example.tsx', 'With icon')
  .addExample('Tag/story/Disabled.example.tsx', 'Disabled')

page.connect(tagGroupStory.chapter)
page.connect(tagRectangularStory.chapter)
