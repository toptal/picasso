import { createStyles } from '@material-ui/core/styles';
export default () => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '& > footer, & > header': {
            flex: 0
        }
    }
});
//# sourceMappingURL=styles.js.map