"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({}));
exports.default = ({ palette, sizes, transitions }) => styles_1.createStyles({
    root: {
        height: 'auto',
        '&:nth-of-type(even)': {
            background: styles_2.alpha(palette.grey.lighter, 0.32)
        },
        '&$hover:hover': {
            backgroundColor: palette.blue.lighter
        }
    },
    head: {
        borderBottom: `${sizes.borderWidth} solid ${palette.grey.lighter}`
    },
    hover: {
        transition: transitions.create('background-color', {
            duration: transitions.duration.shortest
        })
    }
});
//# sourceMappingURL=styles.js.map