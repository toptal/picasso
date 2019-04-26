import { schedule } from 'danger'

import conventionalCommits from './ci/danger/plugins/conventional-commit'

schedule(conventionalCommits)
