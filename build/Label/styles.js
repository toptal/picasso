"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    root: {},
    disabled: {
        borderColor: palette.grey.lighter,
        color: palette.grey.main,
        pointerEvents: 'none'
    },
    white: {
        background: 'none',
        color: palette.common.white
    },
    innerLabel: {
        fontSize: '0.75em',
        fontWeight: 600
    }
});
//# sourceMappingURL=styles.js.map