"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    closeButton: {
        position: 'absolute',
        right: '2rem',
        top: '1.875rem',
        color: palette.grey.dark,
        fontSize: '1em',
        cursor: 'pointer',
        opacity: 0.3,
        '&:hover': {
            opacity: 1
        }
    }
});
//# sourceMappingURL=styles.js.map