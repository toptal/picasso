import { createStyles } from '@material-ui/core/styles';
export default () => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        '& $button + $button': {
            marginLeft: '-1px'
        }
    },
    button: {
        transitionProperty: 'color, background',
        '&:first-child': {
            borderTopRightRadius: 'unset',
            borderBottomRightRadius: 'unset'
        },
        '&:not(:first-child):not(:last-child)': {
            borderRadius: 'unset'
        },
        '&:last-child': {
            borderTopLeftRadius: 'unset',
            borderBottomLeftRadius: 'unset'
        },
        '&:active, &$active, &:hover': {
            zIndex: 1
        }
    },
    active: {}
});
//# sourceMappingURL=styles.js.map