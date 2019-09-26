import { createStyles } from '@material-ui/core/styles';
export default ({ palette }) => createStyles({
    toggleText: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.5em'
    },
    iconWrapper: {
        transform: 'rotate(90deg)',
        fontSize: '0.6em',
        marginLeft: '1em'
    },
    icon: {
        color: palette.primary.main
    },
    expandedIcon: {
        transform: 'rotate(180deg)'
    }
});
//# sourceMappingURL=styles.js.map