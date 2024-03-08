// TODO: delete the file
import { createStyles } from '@material-ui/core/styles'
import { PicassoProvider } from '@toptal/picasso-provider'

/*
https://v4.mui.com/api/paper/
.xoqq7-MuiPaper-root {
    color: unset;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: #fff;
}
elevation from 0 to 24
.xoqq7-MuiPaper-elevation1 {
  box-shadow: 0 0 8px 0 rgba(0,0,0, 0.08);
}
*/

PicassoProvider.override(() => ({
  MuiPaper: {
    root: {
      color: 'unset',
    },
  },
}))

export default () => createStyles({})
