"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../styles");
exports.default = ({ palette, spacing: { input } }) => styles_1.createStyles({
    root: {
        height: input.height,
        width: input.width,
        cursor: 'default',
        padding: `${input.padding} 0.375em`
    },
    input: {
        fontSize: '1em',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: '100%',
        padding: 0,
        border: 'none'
    },
    inputStatus: {
        color: palette.grey.dark
    },
    inputStatusDisabled: {
        color: styles_2.alpha(palette.grey.dark, 0.48)
    },
    inputValue: {
        fontSize: '0.8125em',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    },
    nativeInput: {
        display: 'none'
    },
    button: {
        marginLeft: '0.5em'
    },
    adornmentStart: {
        marginRight: '0.5em',
        marginLeft: '0.25em'
    },
    adornmentEnd: {
        marginLeft: '0.5em',
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    adornmentDisabled: {
        color: styles_2.alpha(palette.grey.dark, 0.48)
    },
    loader: {
        marginRight: '0.25em'
    }
});
//# sourceMappingURL=styles.js.map