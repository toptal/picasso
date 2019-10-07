import { createStyles } from '@material-ui/core/styles';
export default ({ sizes: { input, borderWidth }, palette }) => createStyles({
    root: {
        position: 'relative',
        width: input.width
    },
    rootFull: {
        width: '100%'
    },
    rootShrink: {
        width: 'auto'
    },
    rootAuto: {},
    otherOption: {
        borderTop: `${borderWidth} solid ${palette.grey.light}`
    },
    stringContent: {
        fontSize: '0.8125em'
    }
});
//# sourceMappingURL=styles.js.map