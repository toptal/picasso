import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './PageArticle'

export { default } from './PageArticle'
export type PageInnerProps = OmitInternalProps<Props>
