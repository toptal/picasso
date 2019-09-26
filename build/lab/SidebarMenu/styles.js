import { createStyles } from '@material-ui/core/styles';
export default () => createStyles({
    root: {
        flex: 0,
        boxShadow: 'none',
        order: 1,
        '& &': {
            flex: 1
        }
    },
    bottom: {
        order: 99
    }
});
//# sourceMappingURL=styles.js.map