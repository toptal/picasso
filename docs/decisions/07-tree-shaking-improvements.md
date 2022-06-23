# Tree-shaking improvements

## Problem

Currently there are a few solutions used in Picasso that prevent Webpack from succesfully tree-shaking the unused modules.

1. Compound components (and their unofficial siblings)
2. Picasso provider utilities (Favicon, NotificationsProvider, FixViewport, LoadFonts)

Let me explain each of them in more detail

### 1. Compound components

It is a technique that is used in quite a few components in Picasso (and industry). I am talking about:

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
- `Button`
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
- + the whole `Form` from '@toptal/picasso-forms`

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
// This cannot be statically assessed
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

### Picasso provider utilities

There are four utilities that could be composed, three of them pack extra dependencies:

- `FixViewport` packs `react-helmet`
- `Favicon` packs `react-helmet`
- `NotificationsProvider` packs `notistack`

Currently the way these utilities are enabled/disabled doesn't allow for tree-shaking:

```jsx
const Picasso = ({}: PicassoProps) => {
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
          {fixViewport && <Viewport />}{/* <-- this means that webpack can't statically determine whether Viewport is used or not */}
          {loadFonts && <FontsLoader />}
          {reset && <CssBaseline />}
          {loadFavicon && <Favicon environment={environment} />} {/* <-- same here. To webpack Favicon should be bundled */}
          <NotificationsProvider container={notificationContainer}>{/* <-- same here */}
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

There are 3 possible ways. Neither are quite elegant.

1. In addition to Compound components export the original components as well. So that if I want I can import separate components from root of `@toptal/picasso`.

For the sake of demostration in this RFC PR I've used a `TS` prefix.

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

2. Export a static object with necessary components.

[UPDATE] I couldn't make this solution work as expected in my setup.

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

3. [CHOSEN SOLUTION] Standardize `CompoundComponent` usage

Right now only a few components (6/20 I believe) used a separate `Compound` component for grouping. The rest of compound components were grouped in the parent component (`FormLabel`, `FormField` were grouped in `Form`). This meant that there is no safe way to only import `Form`.

The proposal is to standardise `CompoundComponent` technique across all grouped components. This will not introduce a change to the API while allowing users of the library to fine tune their import to allow for better tree-shaking.

[IMPORTANT] This is not recommended and is a workaround, but it might help shaving some bytes off.

```tsx
import Button from '@toptal/picasso/Button` // - will only import Button, not CompoundButton
```

If this is important you can use this `eslint` rule to help you remember:

```js
// eslintrc.js

const PicassoNonTreeshakeables = [
  'Accordion',
  'Alert',
  'Avatar',
  'Breadcrumbs',
  'Button',
  'Checkbox',
  'Dropdown',
  'Grid',
  'Helpbox',
  'Menu',
  'Modal',
  'Note',
  'Notification',
  'OverviewBlock',
  'Page',
  'Radio',
  'Stepper',
  'Tabs',
  'Table',
  'TagSelector',
  'Form',
  'Tag'
]

module.exports = {
  // ... the rest of the eslint config
  'no-restricted-imports': [
    'warn',
    {
      paths: [
        {
          name: '@toptal/picasso',
          importNames: PicassoNonTreeshakeables,
          message:
            "If you are not using every component from Compound component, consider importing necessary components directly from '@toptal/picasso/Component'"
        },
        ...PicassoNonTreeshakeables.map(component => ({
          name: `@toptal/picasso/${component}`,
          importNames: [component],
          message: 'Use default import instead'
        }))
      ]
    }
  ]
}
```

### Picasso provider utilities

The main idea for improvements would be to give the control of including necessary utilities to the library user. This can be achieved by creating a light version of `Picasso` and composing it ourselves.

```jsx
// _app.tsx
// Export these separately from separate files, so that Webpack can detect if their dependencies are unused
import { FixViewport, Favicon, NotificationsProvider, LoadFonts, PicassoLight } from '@toptal/picasso-provider'

// ...

const App = () => {
  // ...

  return (
    <PicassoLight disableClassNamePrefix>
      <LoadFonts />
      <FixViewport />
      <Favicon environment="production" />
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </PicassoLight>
  )
}
```

### Drawbacks and limitations

### Compound components

**Solution three** was chosen so no change is introduced to the current component API.

⚠️ However, if the user incorrectly imported the components prior to this change, they will need to address that.

```tsx
import Button from '@toptal/picasso/Button`

const Component = () => {
  return <Button.Circular /> {'<-- will now fail'}
}
```

**Solution one** introduced API change and was not straighforward. Also, there would be a huge percent of users, who would not benefit from the change, but would have to rework their apps.

**Solution two** didn't work in targeted environment

### Picasso provider utilities

This one doesn't affect anyone in anyway. This is an added feature.

## Alternatives

An alternative would be to leave it as is. However, I believe that this might reduce the bundle size if implemented correctly.

## Research data

I've done the research here: [this PR](https://github.com/toptal/sat-1985--rfc-picasso-treeshaking/pull/1)

It's done using our tech stack template: next.js + Picasso + SSR

I've tried implementing the object option that was mentioned in the article but couldn't make it work. Possibly there is some tuning to be done to the webpack config

Implementing and testing this change on 4 SAT projects brought the bundle size down by at least 5% and at most 12.5%.
