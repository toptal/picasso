"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    spinnerDefault: {
        color: palette.primary.main
    },
    spinnerInherit: {
        color: 'inherit'
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    label: {
        marginTop: '1rem'
    },
    inline: {
        display: 'inline-flex'
    }
});
//# sourceMappingURL=styles.js.map