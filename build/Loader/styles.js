import { createStyles } from '@material-ui/core/styles';
export default ({ palette }) => createStyles({
    spinnerDefault: {
        color: palette.primary.main
    },
    spinnerInherit: {
        color: 'inherit'
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    label: {
        marginTop: '1rem'
    },
    inline: {
        display: 'inline-flex'
    }
});
//# sourceMappingURL=styles.js.map