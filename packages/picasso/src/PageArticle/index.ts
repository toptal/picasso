/* eslint-disable import/no-extraneous-dependencies */
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './PageArticle'

export { default } from './PageArticle'
export type PageInnerProps = OmitInternalProps<Props>
