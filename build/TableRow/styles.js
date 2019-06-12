"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({}));
exports.default = ({ palette, spacing }) => styles_1.createStyles({
    root: {
        height: 'auto',
        '&:nth-of-type(even)': {
            background: '#f8f9f9'
        }
    },
    head: {
        borderBottom: `${spacing.borderWidth} solid ${palette.grey.lighter}`
    }
});
//# sourceMappingURL=styles.js.map