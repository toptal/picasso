import { createStyles } from '@material-ui/core/styles';
import { PicassoProvider } from '../Picasso';
PicassoProvider.override(() => ({
    MuiExpansionPanelDetails: {
        root: {
            padding: '0 0 0.625em'
        }
    }
}));
export default () => createStyles({
    root: {}
});
//# sourceMappingURL=styles.js.map