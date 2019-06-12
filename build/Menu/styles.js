"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
require("../List/styles");
Picasso_1.PicassoProvider.override(({ shadows }) => ({
    MuiMenu: {
        paper: {
            boxShadow: shadows[2]
        }
    }
}));
exports.default = () => styles_1.createStyles({});
//# sourceMappingURL=styles.js.map