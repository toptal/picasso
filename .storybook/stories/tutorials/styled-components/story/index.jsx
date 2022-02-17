import PicassoBook from '~/.storybook/components/PicassoBook'

const styledComponentsPage = PicassoBook.section('Tutorials').createPage(
  'Styled Components',
  'Tips and tricks for using Picasso components with styled-components'
)

/** Introduction */
styledComponentsPage.createChapter().addTextSection(
  '## `as` prop\n' +
    'Picasso components use `as` prop to render a different root node (ex. [Container](/?path=/story/layout-container--container), ' +
    '[Link](/?path=/story/components-link--link), etc.). `styled-components` supports ' +
    '[`as` prop](https://styled-components.com/docs/api#as-polymorphic-prop) on its own and this creates a conflict.\n\n' +
    'To solve this conflict you should use [`forwardedAs` prop](https://styled-components.com/docs/api#forwardedas-prop) ' +
    'in your application.\n\n' +
    'Example:\n' +
    `
      import { Container } from '@toptal/picasso'
      import * as S from './styles'
      ...
      <Container forwardedAs='span' css={S.container}>
      ...
      </Container>
    \n` +
    'This solution is not type-safe, so additionally we need to add a ' +
    '[global react attribute type](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245#issuecomment-497038332):\n' +
    `
      import { CSSProp } from 'styled-components'

      declare module 'react' {
        interface Attributes {
          css?: CSSProp
          forwardedAs?: string
        }
      }
    `
)
