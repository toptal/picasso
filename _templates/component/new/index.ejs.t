---
to: packages/<%= package %>/src/<%= h.changeCase.pascalCase(name) %>/index.ts
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import { OmitInternalProps } from '@toptal/picasso-shared'

import { Props } from './<%= Name %>'

export { default } from './<%= Name %>'
export type <%= Name %>Props = OmitInternalProps<Props>
