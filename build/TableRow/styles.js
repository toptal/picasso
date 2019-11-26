import { createStyles } from '@material-ui/core/styles';
import { alpha } from '../styles';
import { PicassoProvider } from '../Picasso';
PicassoProvider.override(() => ({}));
export default ({ palette, sizes, transitions }) => createStyles({
    root: {
        height: 'auto',
        '&$hover:hover': {
            backgroundColor: palette.blue.lighter
        }
    },
    head: {
        borderBottom: `${sizes.borderWidth} solid ${palette.grey.lighter}`
    },
    stripeEven: {
        background: alpha(palette.grey.lighter, 0.32)
    },
    hover: {
        transition: transitions.create('background-color', {
            duration: transitions.duration.shortest
        })
    }
});
//# sourceMappingURL=styles.js.map