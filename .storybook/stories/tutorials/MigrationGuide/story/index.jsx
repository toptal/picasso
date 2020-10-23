import PicassoBook from '~/.storybook/components/PicassoBook'
import { Amount } from '@toptal/picasso'

const migrationGuidePage = PicassoBook.section('Tutorials').createPage(
  'Picasso 5.0 migration',
  'Step-by-step guide on how to migrate your app to Picasso 5.0'
)

const chapter = migrationGuidePage.createChapter()

chapter
  .addTextSection(
    `No breaking changes, small styling changes. The component uses borders more heavily and its API was expanded to allow  control over them.`,
    {
      title: 'Accordion'
    }
  )
  .addExample('tutorials/MigrationGuide/story/Accordion.example.jsx', {
    id: 'accordion'
  }) // picasso-skip-visuals
