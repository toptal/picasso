"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = () => styles_1.createStyles({
    root: {
        display: 'inline-block',
        '& $button + $button': {
            margin: '0'
        }
    },
    button: {
        '&:first-child': {
            borderTopRightRadius: 'unset',
            borderBottomRightRadius: 'unset',
            borderRight: 'none'
        },
        '&:last-child': {
            borderTopLeftRadius: 'unset',
            borderBottomLeftRadius: 'unset'
        },
        '&:not(:first-child):not(:last-child)': {
            borderRadius: 'unset',
            borderRight: 'none'
        }
    }
});
//# sourceMappingURL=styles.js.map