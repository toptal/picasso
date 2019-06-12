"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({
    MuiInputAdornment: {
        positionStart: {
            marginLeft: 0,
            marginRight: 0
        },
        positionEnd: {
            marginLeft: 0,
            marginRight: 0
        }
    }
}));
exports.default = () => core_1.createStyles({});
//# sourceMappingURL=styles.js.map