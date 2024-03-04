import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './PageArticle'

export { default as PageArticle } from './PageArticle'
export type PageInnerProps = OmitInternalProps<Props>
