"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(({ palette }) => ({
    MuiInputLabel: {
        root: {
            fontSize: 'unset'
        },
        error: {
            color: palette.red.main
        }
    }
}));
exports.default = () => core_1.createStyles({
    root: {}
});
//# sourceMappingURL=styles.js.map