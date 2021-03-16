// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { doc } from 'storybook-readme'
import { storiesOf } from '@storybook/react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CSS_NAMING from '../../docs/contribution/css-naming.md'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NEW_COMPONENT from '../../docs/contribution/new-component-creation.md'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import GITHUB_WORKFLOW from '../../docs/contribution/github-workflow.md'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JSS_ONBOARDING from '../../docs/contribution/jss-onboarding.md'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CREATING_EXAMPLES from '../../docs/contribution/creating-examples.md'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VISUAL_SNAPSHOTS from '../../docs/contribution/visual-testing.md'

storiesOf('Contribution', module)
  .addParameters({ happo: false })
  .add('GitHub workflow', doc(GITHUB_WORKFLOW))
  .add('CSS naming', doc(CSS_NAMING))
  .add('JSS onboarding', doc(JSS_ONBOARDING))
  .add('New components', doc(NEW_COMPONENT))
  .add('Creating examples', doc(CREATING_EXAMPLES))
  .add('Visual snapshots', doc(VISUAL_SNAPSHOTS))
