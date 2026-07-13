// eslint-disable-file @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createMarkdownPage } from '../../../components/Markdown'
import PicassoBook from '../../../components/PicassoBook'
// @ts-ignore
import STYLING from '../../../../docs/contribution/styling.md'
// @ts-ignore
import NEW_COMPONENT from '../../../../docs/contribution/new-component-creation.md'
// @ts-ignore
import GITHUB_WORKFLOW from '../../../../docs/contribution/github-workflow.md'
// @ts-ignore
import CREATING_EXAMPLES from '../../../../docs/contribution/creating-examples.md'
// @ts-ignore
import VISUAL_SNAPSHOTS from '../../../../docs/contribution/visual-testing.md'
// @ts-ignore
import COMPONENT_API from '../../../../docs/contribution/component-api.md'

const section = PicassoBook.section('Contribution')

section.createDocPage('GitHub workflow', createMarkdownPage(GITHUB_WORKFLOW))
section.createDocPage('Styling', createMarkdownPage(STYLING))
section.createDocPage('New components', createMarkdownPage(NEW_COMPONENT))
section.createDocPage(
  'Creating examples',
  createMarkdownPage(CREATING_EXAMPLES)
)
section.createDocPage('Visual snapshots', createMarkdownPage(VISUAL_SNAPSHOTS))
section.createDocPage('Design component API', createMarkdownPage(COMPONENT_API))
