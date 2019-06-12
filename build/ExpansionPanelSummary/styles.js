"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({
    MuiExpansionPanelSummary: {
        root: {
            padding: 0
        },
        expandIcon: {
            transform: 'translateY(-50%) rotate(90deg)',
            left: 0,
            right: 'unset',
            '&$expanded': {
                transform: 'translateY(-50%) rotate(0deg)'
            }
        }
    }
}));
exports.default = () => styles_1.createStyles({
    root: {}
});
//# sourceMappingURL=styles.js.map