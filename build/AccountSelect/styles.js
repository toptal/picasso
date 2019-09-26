import { createStyles } from '@material-ui/core/styles';
export default ({ palette }) => createStyles({
    accountItem: {
        height: 'auto',
        '&+&': {
            borderTop: `1px solid ${palette.grey.light}`
        }
    },
    accountLink: {
        flex: 1
    }
});
//# sourceMappingURL=styles.js.map