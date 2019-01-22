import { PicassoProvider } from '../Picasso'

PicassoProvider.override(() => ({
  MuiExpansionPanelSummary: {
    root: {
      padding: 0
    },
    expandIcon: {
      transform: 'translateY(-50%) rotate(90deg)',
      left: 0,
      right: 'unset',

      '&$expanded': {
        transform: 'translateY(-50%) rotate(0deg)'
      }
    }
  }
}))

export default {
  root: {}
}
