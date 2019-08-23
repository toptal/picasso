"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ sizes: { input } }) => styles_1.createStyles({
    root: {
        position: 'relative',
        width: input.width
    },
    rootFull: {
        width: '100%'
    },
    rootShrink: {
        width: 'auto'
    },
    rootAuto: {}
});
//# sourceMappingURL=styles.js.map