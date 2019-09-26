import { createStyles } from '@material-ui/core/styles';
import { PicassoProvider } from '../Picasso';
PicassoProvider.override(() => ({
    MuiLink: {
        root: {
            cursor: 'pointer'
        }
    }
}));
export default ({ typography, palette }) => createStyles({
    action: {
        fontWeight: typography.fontWeights.semibold
    },
    black: {
        color: palette.common.black
    },
    white: {
        color: palette.common.white
    }
});
//# sourceMappingURL=styles.js.map