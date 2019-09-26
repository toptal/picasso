import { createStyles } from '@material-ui/core/styles';
export default ({ sizes: { input } }) => createStyles({
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
    rootAuto: {}
});
//# sourceMappingURL=styles.js.map