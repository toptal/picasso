import PicassoBook from './components/PicassoBook'

/** Tutorials */
const reqStorybook = require.context(
  '~/.storybook/stories',
  true,
  /story\/index.(jsx|tsx)$/
)

/** Stories from packages */
const reqPackagesComponents = require.context(
  '~/packages',
  true,
  /story\/index.(jsx|tsx)$/
)

PicassoBook.addSections([
  'Tutorials',
  'Components',
  'Layout',
  'Overlays',
  'Utils',
  'Forms',
  'Picasso Forms',
  'Picasso Charts',
  'Picasso Lab',
  'Widgets'
])

require('./stories/Picasso') // markdown pages for README & CHANGELOG
require('./stories/Contributing') // markdown pages for contribution guide
reqStorybook.keys().forEach(filename => reqStorybook(filename))
reqPackagesComponents
  .keys()
  .forEach(filename => reqPackagesComponents(filename))

PicassoBook.generate()
