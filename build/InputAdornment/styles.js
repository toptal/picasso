"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Picasso_1 = require("../Picasso");
const styles_1 = require("../styles");
Picasso_1.PicassoProvider.override(({ palette }) => ({
    MuiInputAdornment: {
        root: {
            color: palette.grey.dark
        },
        positionStart: {},
        positionEnd: {
            justifyContent: 'flex-end',
            flexGrow: 1
        }
    }
}));
exports.default = ({ palette }) => core_1.createStyles({
    root: {},
    rootDisabled: {
        color: styles_1.alpha(palette.grey.dark, 0.48)
    }
});
//# sourceMappingURL=styles.js.map