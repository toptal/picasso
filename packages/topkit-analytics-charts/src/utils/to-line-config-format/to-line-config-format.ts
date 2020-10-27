import { LineConfig } from '@toptal/picasso-charts'

import { ReferenceLine } from './../../AnalyticsChart/AnalyticsChart'
import generateReferenceKey from '../generate-reference-key'

const toLineConfigFormat = (
  lineConfig: LineConfig,
  referenceLines: ReferenceLine[]
): LineConfig =>
  referenceLines.reduce(
    (lineConfig, { color }, index) => {
      lineConfig[generateReferenceKey(index)] = { variant: 'reference', color }

      return lineConfig
    },
    { ...lineConfig }
  )

export default toLineConfigFormat
