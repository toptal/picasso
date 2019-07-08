"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = () => styles_1.createStyles({
    root: {
        position: 'relative'
    },
    closeButton: {
        position: 'absolute',
        top: '1.625em',
        right: '1.25em',
        background: 'transparent',
        border: 0,
        padding: 0,
        '&:hover': {
            background: 'transparent'
        }
    }
});
//# sourceMappingURL=styles.js.map