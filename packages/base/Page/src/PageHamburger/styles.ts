import { createStyles } from '@material-ui/core/styles'

import { headerBreakingPointXL } from '../PageTopBar/constants'

export default () => {
  return createStyles({
    root: {
      [headerBreakingPointXL]: {
        //TODO: add important property here to overwrite the styles in Dropdown component. Should be removed after migrating to TailwindCSS in task https://toptal-core.atlassian.net/browse/FX-5688
        display: 'none !important',
      },
    },
    popper: {
      marginTop: '1rem',
    },
    hamburger: {
      pointerEvents: 'none',
    },
    hidden: {
      //TODO: add important property here to overwrite the styles in Dropdown component. Should be removed after migrating to TailwindCSS in task https://toptal-core.atlassian.net/browse/FX-5688
      display: 'none !important',
    },
  })
}
