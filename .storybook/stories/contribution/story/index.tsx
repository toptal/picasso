// eslint-disable-file @typescript-eslint/ban-ts-comment
// @ts-ignore
import { doc } from 'storybook-readme'

import PicassoBook from '../../../components/PicassoBook'
// @ts-ignore
import CSS_NAMING from '../../../../docs/contribution/css-naming.md'
// @ts-ignore
import NEW_COMPONENT from '../../../../docs/contribution/new-component-creation.md'
// @ts-ignore
import GITHUB_WORKFLOW from '../../../../docs/contribution/github-workflow.md'
// @ts-ignore
import JSS_ONBOARDING from '../../../../docs/contribution/jss-onboarding.md'
// @ts-ignore
import CREATING_EXAMPLES from '../../../../docs/contribution/creating-examples.md'
// @ts-ignore
import VISUAL_SNAPSHOTS from '../../../../docs/contribution/visual-testing.md'
// @ts-ignore
import COMPONENT_API from '../../../../docs/contribution/component-api.md'

const section = PicassoBook.section('Contribution')
section.createDocPage('GitHub workflow', doc(GITHUB_WORKFLOW))
section.createDocPage('CSS naming', doc(CSS_NAMING))
section.createDocPage('JSS onboarding', doc(JSS_ONBOARDING))
section.createDocPage('New components', doc(NEW_COMPONENT))
section.createDocPage('Creating examples', doc(CREATING_EXAMPLES))
section.createDocPage('Visual snapshots', doc(VISUAL_SNAPSHOTS))
section.createDocPage('Design component API', doc(COMPONENT_API))
