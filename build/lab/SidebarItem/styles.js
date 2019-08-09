"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    root: {
        height: '3em',
        padding: '0 1.5em',
        color: palette.grey.dark,
        '&:hover': {
            color: palette.blue.main,
            backgroundColor: 'initial'
        },
        '&:focus': {
            backgroundColor: 'initial'
        }
    },
    selected: {},
    label: {
        marginLeft: '1.875em'
    },
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
        fontSize: '0.6em',
        color: 'inherit'
    },
    noWrap: {
        flex: 1,
        minWidth: 0
    }
});
//# sourceMappingURL=styles.js.map