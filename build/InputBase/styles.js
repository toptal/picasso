"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(({ typography, palette }) => ({
    MuiInputBase: {
        root: {
            fontSize: 'unset'
        },
        input: {
            fontSize: typography.inputSize,
            lineHeight: '1.2em'
        },
        error: {
            color: palette.red.main,
            backgroundColor: palette.red.lighter
        }
    }
}));
//# sourceMappingURL=styles.js.map