"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({
    MuiStepper: {
        root: {
            padding: 0
        }
    }
}));
exports.default = () => styles_1.createStyles({
    fullWidth: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
//# sourceMappingURL=styles.js.map