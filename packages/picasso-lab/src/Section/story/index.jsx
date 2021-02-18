import { Section } from '../Section'
import PicassoBook from '~/.storybook/components/PicassoBook'
import sectionTitleStory from '../../SectionTitle/story'
import sectionSubtitleStory from '../../SectionSubtitle/story'
import sectionActionsStory from '../../SectionActions/story'
import sectionContentStory from '../../SectionContent/story'

const page = PicassoBook.section('Picasso Lab').createPage('Section')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Section, name: 'Section' })
  .addComponentDocs(sectionTitleStory.componentDocs)
  .addComponentDocs(sectionSubtitleStory.componentDocs)
  .addComponentDocs(sectionActionsStory.componentDocs)
  .addComponentDocs(sectionContentStory.componentDocs)

page
  .createChapter()
  .addExample('Section/story/Default.example.tsx', 'Default')
  .addExample('Section/story/WithTitle.example.tsx', 'With title')
  .addExample('Section/story/WithSubtitle.example.tsx', 'With subtitle')
  .addExample('Section/story/WithActions.example.tsx', 'With actions')
