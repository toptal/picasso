import { createStyles } from '@material-ui/core/styles';
import { PicassoProvider } from '../Picasso';
PicassoProvider.override(({ palette }) => ({
    MuiCircularProgress: {
        colorPrimary: {
            color: palette.grey.darker
        }
    }
}));
export default () => createStyles({
    root: {}
});
//# sourceMappingURL=styles.js.map