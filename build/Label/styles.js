"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    deleteIcon: {
        display: 'flex',
        justifyContent: 'center',
        color: palette.text.primary,
        fontSize: '0.85em',
        margin: '0 0.5em 0 -0.5em',
        opacity: 0.5,
        '&:hover': {
            opacity: 1,
            color: palette.text.primary
        }
    }
});
//# sourceMappingURL=styles.js.map