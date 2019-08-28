"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
require("../InputBase/styles");
require("../InputLabel/styles");
require("../OutlinedInput/styles");
require("../InputAdornment/styles");
exports.default = ({ sizes: { input } }) => styles_1.createStyles({
    root: {
        padding: input.padding
    },
    rootMultiline: {
        height: 'auto'
    },
    input: {
        fontSize: '0.8125em',
        padding: 0
    }
});
//# sourceMappingURL=styles.js.map