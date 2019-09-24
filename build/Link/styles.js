"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({
    MuiLink: {
        root: {
            cursor: 'pointer'
        }
    }
}));
exports.default = ({ typography, palette }) => styles_1.createStyles({
    action: {
        fontWeight: typography.fontWeights.semibold
    },
    black: {
        color: palette.common.black
    },
    white: {
        color: palette.common.white
    }
});
//# sourceMappingURL=styles.js.map