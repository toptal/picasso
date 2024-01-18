#!/usr/bin/env node

/* eslint-disable */
import { $, cd } from 'zx'
import path from 'node:path'
import { packageUp } from 'package-up'

const data = `\
/home/amoura/des/toptal/picasso/cypress/component/DatePicker.spec.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/cypress/component/Drawer.spec.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/cypress/component/Dropdown.spec.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/cypress/component/Modal.spec.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/cypress/component/NotificationStream.spec.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/cypress/component/Page.spec.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/cypress/component/PageHamburger.spec.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/cypress/component/Select.spec.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/cypress/support/commands.jsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/packages/base/ApplicationUpdateNotification/src/ApplicationUpdateNotification/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/ApplicationUpdateNotification/src/ApplicationUpdateNotificationActions/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/Autocomplete/src/Autocomplete/use-autocomplete/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Avatar/src/Image/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/AvatarUpload/src/AvatarUpload/hooks/use-avatar-states/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/AvatarUpload/src/AvatarUpload/hooks/use-avatar-upload/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Breadcrumbs/src/Breadcrumbs/story/Default.example.tsx::react-router-dom
/home/amoura/des/toptal/picasso/packages/base/Dropdown/src/DropdownArrow/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/Form/src/Form/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/Icons/src/Icon/_generatorTemplate.js::@babel/types
/home/amoura/des/toptal/picasso/packages/base/Link/src/Link/story/Routing.example.tsx::react-router-dom
/home/amoura/des/toptal/picasso/packages/base/Link/src/Link/test.tsx::react-router-dom
/home/amoura/des/toptal/picasso/packages/base/Loader/src/Loader/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/Menu/src/Menu/hooks/use-drilldown-menu/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Menu/src/Menu/hooks/use-menu-variant/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Menu/src/Menu/hooks/use-menu/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Menu/src/Menu/hooks/use-slide-menu/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Menu/src/MenuItem/hooks/use-drilldown-menu-item/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Menu/src/MenuItem/hooks/use-menu-item-key/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Menu/src/MenuItem/hooks/use-menu-item/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Menu/src/MenuItem/hooks/use-slide-menu-item/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Menu/src/MenuItem/story/Router.example.tsx::react-router-dom
/home/amoura/des/toptal/picasso/packages/base/Modal/src/ModalContent/hooks/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Notification/src/use-notification/use-notifications.tsx::notistack
/home/amoura/des/toptal/picasso/packages/base/OverviewBlock/src/OverviewBlock/story/Routing.example.tsx::react-router-dom
/home/amoura/des/toptal/picasso/packages/base/OverviewBlock/src/OverviewBlock/test.tsx::react-router-dom
/home/amoura/des/toptal/picasso/packages/base/Page/src/PageHamburger/PageHamburger.tsx::@toptal/picasso-dropdown
/home/amoura/des/toptal/picasso/packages/base/Page/src/PageHamburger/PageHamburgerPortal.tsx::react-dom
/home/amoura/des/toptal/picasso/packages/base/Page/src/PageTopBarMenu/PageTopBarMenu.tsx::@toptal/picasso-user-badge
/home/amoura/des/toptal/picasso/packages/base/Page/src/PageTopBarMenu/PageTopBarMenu.tsx::@toptal/picasso-dropdown
/home/amoura/des/toptal/picasso/packages/base/Page/src/SidebarItem/SidebarItemCompact.tsx::@toptal/picasso-dropdown
/home/amoura/des/toptal/picasso/packages/base/Page/src/SidebarItem/SidebarItemHeader.tsx::@toptal/picasso-menu
/home/amoura/des/toptal/picasso/packages/base/Page/src/SidebarItem/story/Links.example.tsx::react-router-dom
/home/amoura/des/toptal/picasso/packages/base/Page/src/SidebarItem/test.tsx::ap-style-title-case
/home/amoura/des/toptal/picasso/packages/base/Page/src/SidebarItem/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Page/src/SidebarItemContent/SidebarItemContent.tsx::@toptal/picasso-tooltip
/home/amoura/des/toptal/picasso/packages/base/Page/src/SidebarItemContent/SidebarItemContent.tsx::@toptal/picasso-tag
/home/amoura/des/toptal/picasso/packages/base/Page/src/SidebarMenu/SidebarMenu.tsx::@toptal/picasso-menu
/home/amoura/des/toptal/picasso/packages/base/Page/src/TopBarMenu/TopBarMenu.tsx::@toptal/picasso-menu
/home/amoura/des/toptal/picasso/packages/base/Popper/src/Popper/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-adornments/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-highlighted-index/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-arrows-keydown-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-blur-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-click-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-enter-or-space-keydown-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-escape-keydown-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-focus-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-item-on-click-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-item-on-mouse-down-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-item-on-mouse-enter-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-reset-click-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-search-blur-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-search-change-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-search-keydown-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-select-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-props/use-select-keydown-handler/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Select/src/SelectBase/hooks/use-select-state/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Slider/src/Slider/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/Tabs/src/Tabs/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/Tooltip/src/Tooltip/test.tsx::@testing-library/react
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Breakpoints/story/Breakpoints.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Breakpoints/story/MediaQueries.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Breakpoints/story/useBreakpoint.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Breakpoints/story/useScreens.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Colors/story/Default.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Colors/story/HowToUse.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Formatters/story/amount.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Gradients/story/Default.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Gradients/story/HowToUse.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Shadows/story/Default.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Shadows/story/HowToUse.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/Transitions/Rotate180/story/Default.example.tsx::@toptal/picasso-utils
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/__tests__/use-page-scroll-lock.test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/useBoolean/test.tsx::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/useInterval/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/base/Utils/src/utils/useMouseEnter/test.ts::@testing-library/react-hooks
/home/amoura/des/toptal/picasso/packages/picasso-provider/src/Favicon/test.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/packages/picasso-provider/src/Picasso/NotificationsProvider/test.tsx::@toptal/picasso-test-utils
/home/amoura/des/toptal/picasso/packages/picasso-provider/src/Picasso/story/BarePicassoLight.example.tsx::@toptal/picasso-provider
/home/amoura/des/toptal/picasso/packages/picasso-provider/src/Picasso/story/Default.example.tsx::@toptal/picasso-provider
/home/amoura/des/toptal/picasso/packages/picasso-provider/src/Picasso/story/DisableResponsiveUI.example.tsx::@toptal/picasso-provider
/home/amoura/des/toptal/picasso/packages/picasso-provider/src/Picasso/story/LightWithFixViewportAndFontsLoader.example.tsx::@toptal/picasso-provider
/home/amoura/des/toptal/picasso/packages/picasso-provider/src/Picasso/story/LightWithNotificationsAndFavicon.example.tsx::@toptal/picasso-provider
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-amount
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-amount
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-breadcrumbs
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-breadcrumbs
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-dropdown
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-dropdown
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-list
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-list
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-menu
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-menu
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-note
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-note
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-overview-block
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-overview-block
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-quote
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-quote
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-rating
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-rating
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-switch
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-switch
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-tag
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-tag
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-timeline
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-timeline
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-tooltip
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-tooltip
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-user-badge
/home/amoura/des/toptal/picasso/packages/picasso/src/index.ts::@toptal/picasso-user-badge`

const main = async () => {
  const ps = {}

  for (const entry of data.split('\n')) {
    const [file, pkg] = entry.split('::')

    const prj = path.resolve(await packageUp({ cwd: path.dirname(file) }))

    ;(ps[prj] ??= new Set()).add(pkg)
  }

  for (const [proj, pkgs] of Object.entries(ps)) {
    cd(path.dirname(proj))

    const getNameNpm = await $`npm pkg get name`.quiet()

    const projName = JSON.parse(getNameNpm.stdout.trim().split('\n')[0])

    const args = [...pkgs].flatMap(pkg => {
      if (!pkg.includes('@toptal/picasso') || pkg === projName) {
        return []
      }

      if (pkg === '@toptal/picasso-provider') {
        return [
          `peerDependencies[${pkg}]=3.4.2`,
          `devDependencies[${pkg}]=3.4.2`,
        ]
      }

      let version = '1.0.0'

      if (pkg === '@toptal/picasso-test-utils') {
        return [`devDependencies[${pkg}]=${version}`]
      }

      if (pkg === '@toptal/picasso-shared') {
        version = '13.1.2'
      }

      return [`dependencies[${pkg}]=${version}`]
    })

    if (args.length === 0) {
      continue
    }

    await $`npm pkg set ${args}`
  }
}

await main()
