"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette, zIndex }) => styles_1.createStyles({
    menu: {
        left: 0,
        right: 0,
        zIndex: zIndex.drawer,
        position: 'absolute',
        backgroundColor: palette.common.white
    },
    scrollView: {
        maxHeight: '10.125em',
        overflowY: 'auto'
    }
});
//# sourceMappingURL=styles.js.map