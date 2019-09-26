import { createStyles } from '@material-ui/core/styles';
import { PicassoProvider } from '../Picasso';
PicassoProvider.override(({ shadows }) => ({
    MuiList: {
        root: {
            boxShadow: shadows[1]
        }
    }
}));
export default () => createStyles({});
//# sourceMappingURL=styles.js.map