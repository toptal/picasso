import { createStyles } from '@material-ui/core/styles';
import '../InputBase/styles';
import '../InputLabel/styles';
import '../OutlinedInput/styles';
import '../InputAdornment/styles';
export default ({ sizes: { input } }) => createStyles({
    root: {
        padding: input.padding
    },
    rootMultiline: {
        height: 'auto'
    },
    input: {
        fontSize: '0.8125em',
        padding: 0
    },
    icon: {
        flex: '1 1 0%' // fix for IE11
    }
});
//# sourceMappingURL=styles.js.map