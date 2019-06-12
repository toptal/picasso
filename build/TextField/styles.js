"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
require("../FormControl/styles");
require("../InputBase/styles");
require("../InputLabel/styles");
require("../OutlinedInput/styles");
require("../InputAdornment/styles");
exports.default = ({ spacing: { input, inputIcon } }) => styles_1.createStyles({
    root: {
        fontSize: 'inherit',
        boxSizing: 'border-box',
        height: input.height,
        padding: input.padding
    },
    rootMultiline: {
        height: 'auto'
    },
    rootFixedWidth: {
        width: input.width
    },
    rootFullWidth: {
        width: '100%'
    },
    input: {
        fontSize: '0.8125em',
        border: 'none',
        padding: 0
    },
    inputMultiline: {
        padding: 0
    },
    icon: {
        fontSize: '1em',
        minWidth: inputIcon.width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '1em'
    },
    iconStart: {
        marginRight: '0.5em'
    },
    iconEnd: {
        marginLeft: '0.5em'
    }
});
//# sourceMappingURL=styles.js.map