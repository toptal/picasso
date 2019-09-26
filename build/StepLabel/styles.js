import { createStyles } from '@material-ui/core/styles';
import { PicassoProvider } from '../Picasso';
import { rem } from '../styles';
PicassoProvider.override(() => ({
    MuiStepLabel: {
        label: {
            display: 'flex',
            '&$active': {
                display: 'flex'
            }
        },
        iconContainer: {
            paddingRight: 0
        }
    }
}));
export default ({ palette }) => createStyles({
    hidden: {
        display: 'none'
    },
    root: {
        marginLeft: '0.5em'
    },
    label: {
        fontSize: rem('11px'),
        fontWeight: 600,
        lineHeight: '1em',
        color: palette.grey.dark
    }
});
//# sourceMappingURL=styles.js.map