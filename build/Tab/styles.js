"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
const styles_2 = require("../styles");
Picasso_1.PicassoProvider.override(({ breakpoints, palette, typography }) => ({
    MuiTab: {
        root: {
            fontWeight: typography.fontWeights.semibold,
            minHeight: 0,
            minWidth: 0,
            lineHeight: 1,
            textTransform: 'none',
            padding: `${styles_2.rem('11px')} 0 ${styles_2.rem('9px')}`,
            [breakpoints.up('md')]: {
                padding: undefined
            },
            color: palette.grey.dark,
            '&$selected': {
                color: palette.common.black
            },
            '&:not(:last-child)': {
                marginRight: '2em'
            },
            [breakpoints.up('md')]: {
                minWidth: undefined,
                fontSize: undefined
            }
        },
        selected: {},
        wrapper: {
            fontSize: styles_2.rem('13px'),
            lineHeight: '1rem'
        }
    }
}));
exports.default = () => styles_1.createStyles({});
//# sourceMappingURL=styles.js.map