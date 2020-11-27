import PicassoBook from '~/.storybook/components/PicassoBook'
import { Amount } from '@toptal/picasso'

const migrationGuidePage = PicassoBook.section('Tutorials').createPage(
  'Picasso 5.0 migration',
  'Step-by-step guide on how to migrate your app to Picasso 5.0'
)

const chapter = migrationGuidePage.createChapter()

chapter.addExample('tutorials/MigrationGuide/story/Subheader.example.jsx', {
  title: 'Subheader'
}) // picasso-skip-visuals
