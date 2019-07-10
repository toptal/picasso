"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    root: {},
    disabled: {
        borderColor: palette.grey.lighter,
        color: palette.grey.main,
        pointerEvents: 'none'
    }
});
//# sourceMappingURL=styles.js.map