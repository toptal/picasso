import { schedule } from 'danger'

import emptyLabels from './ci/danger/plugins/empty-labels'
import conventionalCommits from './ci/danger/plugins/conventional-commit'

emptyLabels()
schedule(conventionalCommits)
