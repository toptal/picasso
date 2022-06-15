# Tree-shaking improvements

## Problem

Currently there are a few solutions used in Picasso that prevent webpack from succesfully tree-shake unused modules.

1. Compound components (and their unofficial siblings)
2. Picasso provider utilities (Favicon, NotificationsProvider, FixViewport)

Let me explain each of them in more detail

### 1. Compound components

It is a technique that is used in quite a few components in Picasso. I am talking about:

```jsx
import Button from '../Button'
import Group from '../ButtonGroup'
import Circular from '../ButtonCircular'
import Action from '../ButtonAction'
import Split from '../ButtonSplit'
import Checkbox from '../ButtonCheckbox'
import Radio from '../ButtonRadio'

export const ButtonCompound = Object.assign(Button, {
  Group,
  Circular,
  Action,
  Split,
  Checkbox,
  Radio
})
```

Besides `Button` component there are these components that use this technique:

- `Accordion`
- `Alert`
- `Avatar`
- `Breadcrumbs`
- `Checkbox`
- `Dropdown`
- `Grid`
- `Helpbox`
- `Menu`
- `Modal`
- `Note`
- `Notification`
- `OverviewBlock`
- `Page`
- `Radio`
- `Stepper`
- `Tabs`
- `Table`
- `TagSelector`
- `Form`
- `Tag`

**Why is this a problem?**

https://webpack.js.org/guides/tree-shaking/

The way tree shaking works in Webpack (greatly simplified):

1. ESM imports/exports are analyzed
2. Statements are analyzed
3. Unused imports/exports are marked as such
4. Unused imports/exports are removed during the minification

For a visual example see: [this article](https://toptal-core.atlassian.net/wiki/spaces/SACQ/pages/2574909441/Picasso+ESM+Modules+Next.js+Transpilation+Tree-shaking#Does-tree-shaking-work-when-using-next-transpile-modules-?)

For a hands-on example see: [this PR](https://github.com/toptal/sat-1985--rfc-picasso-treeshaking/pull/1)

**Why doesn't it work then?**

Well, if you think about it it's logical.

```jsx
// ButtonCompound.tsx
import Button from '../Button'
import Group from '../ButtonGroup'
import Circular from '../ButtonCircular'
import Action from '../ButtonAction'
import Split from '../ButtonSplit'
import Checkbox from '../ButtonCheckbox'
import Radio from '../ButtonRadio'

// All the imports are used in the Object.assign expression
// This cannot be staticly assessed
export const ButtonCompound = Object.assign(Button, {
  Group,
  Circular,
  Action,
  Split,
  Checkbox,
  Radio
})

// It is not possible to detect which of these were used in the rest of the code
// Consider the following:

// other-project/src/ComponentWithButton.tsx
import { Button } from '@toptal/picasso`

const ComponentWithButton = () => {
  // Without actual execution we can't know for sure which property will be accessed on Button
  const ButtonComponent = Math.random() > 0.5 ? Button['Cir' + 'cular'] : Button

  return <ButtonComponent>Oops</ButtonComponent>
}
```

See also: https://blog.logrocket.com/tree-shaking-and-code-splitting-in-webpack/

This article suggests using the static object as an export. I tried it, but it didn't work in my setup.

### Picasso provider utilities

There are three utilities that pack some dependencies:

- `FixViewport` packs `react-helmet`
- `Favicon` packs `react-helmet`
- `NotificationsProvider` packs `notistack`

Currently the way these utilities are enabled/disabled doesn't allow for tree-shaking:

```jsx
const Picasso = ({}: // ...
PicassoProps) => {
  // ...
  return (
    <StylesProvider
      generateClassName={generateClassName}
      injectFirst={injectFirst}
    >
      <MuiThemeProvider theme={PicassoProvider.theme}>
        <PicassoGlobalStylesProvider
          RootComponent={RootComponent}
          environment={environment}
          titleCase={titleCase}
          disableTransitions={disableTransitions}
        >
          {fixViewport && <Viewport />}{' '}
          {/* <-- this means that webpack can't statically determine whether Viewport is used or not */}
          {loadFonts && <FontsLoader />}
          {reset && <CssBaseline />}
          {loadFavicon && <Favicon environment={environment} />} {/* <-- same here. To webpack Favicon should be bundled */}
          <NotificationsProvider container={notificationContainer}>
            {' '}
            {/* <-- same here */}
            {children}
          </NotificationsProvider>
        </PicassoGlobalStylesProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}
```

Assuming the app doesn't need those, that's extra 70kb of parsed JS bundled.

## Proposal

### Compound components

There are 2 possible ways. Neither are quite elegant.

1. In addition to Compound components export the original components as well. So that if I want I can import separate components.

I am not sure about exact implementation. This should be discussed. Right now in this RFC PR I've used a `TS` prefix.
This is of course not usable for production.

```jsx
// ...
// picasso/src/index.ts

export { default as TSPage } from './Page'
export { default as TSPageHelmet } from './PageHelmet'
export { default as TSPageTopBar } from './PageTopBar'
export { default as TSPageTopBarMenu } from './PageTopBarMenu'
export { default as TSPageFooter } from './PageFooter'
export { default as TSPageContent } from './PageContent'
export { PageBanner as TSPageBanner } from './PageBanner/PageBanner'
export { default as TSPageBannerActions } from './NotificationActions'
export { default as TSPageAutocomplete } from './PageAutocomplete'
export { default as TSPageArticle } from './PageArticle'
export { PageSidebar as TSPageSidebar } from './PageSidebar/PageSidebar'
export { default as TSPageSidebarMenu } from './SidebarMenu'
export { default as TSPageSidebarItem } from './SidebarItem'
export { default as TSPageSidebarLogo } from './SidebarLogo'

// ...
```

2. Export a static object with necessary components -- This one doesn't work for me. Check out the research section

```jsx
// ./src/PageCompound/page-object.ts

import Page from '../Page'
import PageHelmet from '../PageHelmet'
import PageTopBar from '../PageTopBar'
import PageTopBarMenu from '../PageTopBarMenu'
import PageFooter from '../PageFooter'
import PageContent from '../PageContent'
import PageBanner from '../PageBanner'
import PageAutocomplete from '../PageAutocomplete'
import PageArticle from '../PageArticle'
import PageSidebar from '../PageSidebar'

export const PageObject = {
  Page,
  TopBar: PageTopBar,
  TopBarMenu: PageTopBarMenu,
  Content: PageContent,
  Footer: PageFooter,
  Sidebar: PageSidebar,
  Banner: PageBanner,
  Helmet: PageHelmet,
  Autocomplete: PageAutocomplete,
  Article: PageArticle
}
```

### Picasso provider utilities

The main idea for improvements would be to give the control of including necessary utilities to the library user.

```jsx
// _app.tsx
// Export these separately from separate files, so that Webpack can detect if their dependencies are unused
import Picasso, { FixViewport, Favicon, NotificationsProvider } from '@toptal/picasso-provider'

// ...

const App = () => {
  // ...

  return (
    <Picasso loadFonts={false} disableClassNamePrefix>
      <FixViewport />
      <Favicon environment="production" />
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </Picasso>
  )
}
```

### Drawbacks and limitations

### Compound components

Most importantly this is a huge design change and is a breaking change.
It wouldn't be straightforward to use any of suggested changes together with the current solution.
Performance-wise there are no drawbacks. It's strictly the way that components are exported

### Picasso provider utilities

Same as the other one. It's a breaking and design change. I'd probably say that this API is less user-friendly, it's always easier to just pass a prop.

## Alternatives

An alternative would be to leave it as is. However, I believe that this might reduce the bundle size if implemented correctly.

## Research data

I've done the research here: [this PR](https://github.com/toptal/sat-1985--rfc-picasso-treeshaking/pull/1)

It's done using our tech stack template: next.js + Picasso + SSR

I've tried implementing the object option that was mentioned in the article but couldn't make it work. Possibly there is some tuning to be done to the webpack config
