"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = () => styles_1.createStyles({
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