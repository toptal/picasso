import { createStyles } from '@material-ui/core/styles';
import { PicassoProvider } from '../Picasso';
PicassoProvider.override(() => ({
    MuiStepper: {
        root: {
            padding: 0
        }
    }
}));
export default () => createStyles({
    fullWidth: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
//# sourceMappingURL=styles.js.map