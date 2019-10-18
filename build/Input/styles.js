import { createStyles } from '@material-ui/core/styles';
import '../InputBase/styles';
import '../InputLabel/styles';
import '../OutlinedInput/styles';
import '../InputAdornment/styles';
export default ({ sizes: { input }, palette }) => createStyles({
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
    },
    counter: {
        color: palette.grey.main,
        fontSize: '0.625rem'
    },
    counterNegative: {
        color: palette.red.main
    },
    counterMultiline: {
        alignSelf: 'flex-end',
        marginBottom: '0.3125rem'
    }
});
//# sourceMappingURL=styles.js.map