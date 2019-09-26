import { createStyles } from '@material-ui/core/styles';
export default ({ palette }) => createStyles({
    closeButton: {
        position: 'absolute',
        right: '2rem',
        top: '1.875rem',
        color: palette.grey.dark,
        fontSize: '1em',
        cursor: 'pointer',
        opacity: 0.3,
        '&:hover': {
            opacity: 1
        }
    }
});
//# sourceMappingURL=styles.js.map