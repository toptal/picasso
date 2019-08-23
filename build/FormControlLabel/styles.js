"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(({ palette, typography }) => ({
    MuiFormControlLabel: {
        root: {
            marginLeft: 0,
            marginRight: 0
        },
        label: {
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '1em',
            color: palette.text.primary,
            lineHeight: '1.5em',
            fontWeight: typography.fontWeightRegular,
            cursor: 'pointer',
            userSelect: 'none',
            '&$disabled': {
                cursor: 'not-allowed',
                pointerEvents: 'auto'
            }
        }
    }
}));
exports.default = () => styles_1.createStyles({
    root: {},
    disabled: {}
});
//# sourceMappingURL=styles.js.map