import { createStyles } from '@material-ui/core/styles';
import '../Chip/styles';
export default ({ palette }) => createStyles({
    root: {},
    disabled: {
        borderColor: palette.grey.lighter,
        color: palette.grey.main,
        pointerEvents: 'none'
    },
    white: {
        background: 'none',
        color: palette.common.white
    },
    innerLabel: {
        fontSize: '0.75em',
        fontWeight: 600
    }
});
//# sourceMappingURL=styles.js.map