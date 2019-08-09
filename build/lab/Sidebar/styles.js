"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    root: {
        height: '100%',
        width: '17em',
        boxShadow: `inset -1px 0px 0px 0px ${palette.grey.lighter}`,
        padding: '1em 0'
    },
    spacer: {
        order: 50,
        flex: 1,
        height: '100%'
    }
});
//# sourceMappingURL=styles.js.map