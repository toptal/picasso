"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../styles");
exports.default = ({ palette, typography }) => styles_1.createStyles({
    root: {
        padding: '0.5rem 1rem',
        height: '2.5rem',
        lineHeight: '1.5rem',
        borderBottom: 'none',
        '&:last-child': {
            paddingRight: '1.5rem'
        }
    },
    head: {
        fontSize: styles_2.rem('12px'),
        fontWeight: typography.fontWeights.semibold,
        color: palette.text.primary
    },
    body: {
        fontSize: styles_2.rem('13px'),
        fontWeight: typography.fontWeights.regular,
        color: palette.text.primary
    }
});
//# sourceMappingURL=styles.js.map