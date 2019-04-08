import { DangerDSLType } from 'danger/distribution/dsl/DangerDSL'

declare var danger: DangerDSLType

export declare function fail(message: string): void

const emptyLabels = () => {
  if (danger.github.issue.labels.length === 0) {
    fail('Please assign some labels to this PR before merging.')
  }
}

export default emptyLabels
