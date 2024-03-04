import { getCheckpoints } from './get-checkpoints'
import { getHappoTargets } from './get-happo-targets'

const checkpoints = getCheckpoints()

export { getHappoTargets, getCheckpoints }

export const HAPPO_TARGETS = getHappoTargets(checkpoints)
