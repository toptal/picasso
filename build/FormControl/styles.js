"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({
    MuiFormControl: {}
}));
exports.default = () => styles_1.createStyles({});
//# sourceMappingURL=styles.js.map