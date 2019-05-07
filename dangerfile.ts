import { schedule } from 'danger'

import conventionalCommits from './ci/danger/plugins/conventional-commit'
import conventionalPRTitle from './ci/danger/plugins/conventional-pr-title'

schedule(conventionalCommits)
schedule(conventionalPRTitle)
