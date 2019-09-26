import { createStyles } from '@material-ui/core/styles';
export default ({ palette }) => createStyles({
    root: {
        height: '3em',
        padding: '0 1.5em',
        '&:hover': {
            backgroundColor: 'initial'
        },
        '&:focus': {
            backgroundColor: 'initial'
        },
        '$nonCollapsibleMenu &': {
            paddingLeft: '3.375em'
        },
        '$details &': {
            paddingLeft: '3.375em'
        }
    },
    light: {
        color: palette.grey.dark,
        '&:hover': {
            color: palette.blue.main
        }
    },
    dark: {
        color: palette.grey.main,
        '&:hover': {
            color: palette.common.white
        }
    },
    selected: {},
    label: {},
    withIcon: {
        marginLeft: '0.875em'
    },
    summary: {
        padding: 0
    },
    details: {
        fontSize: 'inherit',
        marginBottom: '0'
    },
    content: {
        fontSize: 'inherit'
    },
    expandIcon: {
        margin: '0.8em',
        fontSize: '0.6em'
    },
    lightExpandIcon: {
        color: palette.grey.dark
    },
    darkExpandIcon: {
        color: palette.grey.main
    },
    expandIconDisabled: {
        color: palette.grey.main
    },
    noWrap: {
        flex: 1,
        minWidth: 0
    },
    nonCollapsibleMenu: {}
});
//# sourceMappingURL=styles.js.map