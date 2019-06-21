"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(({ typography }) => ({
    MuiExpansionPanelSummary: {
        root: {
            fontSize: '1em',
            padding: '0.625em 0 0.5em',
            fontWeight: typography.fontWeights.semibold,
            minHeight: '2.45em',
            '&$expanded': {
                minHeight: '2.45em'
            }
        },
        expandIcon: {
            padding: 0,
            right: 0,
            transform: 'translateY(-50%) rotate(90deg)',
            '&$expanded': {
                transform: 'translateY(-50%) rotate(-90deg)'
            }
        },
        content: {
            fontSize: '0.875em',
            margin: 0,
            '&$expanded': {
                margin: '0'
            }
        }
    }
}));
exports.default = () => styles_1.createStyles({
    root: {}
});
//# sourceMappingURL=styles.js.map