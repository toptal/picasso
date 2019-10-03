import { createStyles } from '@material-ui/core/styles';
import { rem } from '../styles';
import { PicassoProvider } from '../Picasso';
import '../List/styles';
PicassoProvider.override(({ shadows }) => ({
    MuiMenu: {
        paper: {
            boxShadow: shadows[2]
        }
    }
}));
export default () => createStyles({
    backButtonIcon: {
        verticalAlign: 'middle',
        marginTop: rem('-1px'),
        marginRight: rem('4px'),
        marginLeft: rem('-5px')
    },
    hideMenu: {
        display: 'none'
    }
});
//# sourceMappingURL=styles.js.map