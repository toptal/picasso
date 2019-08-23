"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../styles");
exports.default = ({ palette, sizes: { input } }) => styles_1.createStyles({
    root: {
        cursor: 'default',
        padding: `${input.padding} 0.375em`
    },
    input: {
        padding: 0
    },
    inputValue: {
        fontSize: '0.8125em',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        color: palette.grey.dark
    },
    inputValueDisabled: {
        color: styles_2.alpha(palette.grey.dark, 0.48)
    },
    nativeInput: {
        display: 'none'
    },
    button: {
        marginLeft: '0.5em'
    },
    adornmentStart: {
        marginLeft: '0.25em'
    },
    loader: {
        marginRight: '0.25em'
    }
});
//# sourceMappingURL=styles.js.map