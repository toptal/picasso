import { PageAutocomplete } from '../PageAutocomplete'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  PageAutocomplete,
  'Page.Autocomplete'
)

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter(
      'Page.Autocomplete',
      'Autocomplete to be used in Page.Header'
    )
    .addExample(
      'PageAutocomplete/story/Default.example.tsx',
      'Page.Autocomplete Dark'
    )
    .addExample(
      'PageAutocomplete/story/Light.example.tsx',
      'Page.Autocomplete Light'
    )
)

export default {
  componentDocs,
  chapter
}
