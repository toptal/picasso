import PicassoBook from './components/PicassoBook'

/** Tutorials, Picasso readme and Contribution */
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
  'Picasso',
  'Contribution',
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

reqStorybook.keys().forEach(filename => reqStorybook(filename))
reqPackagesComponents
  .keys()
  .forEach(filename => reqPackagesComponents(filename))

PicassoBook.generate()
