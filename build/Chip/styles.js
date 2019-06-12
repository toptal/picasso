"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(({ palette, spacing }) => ({
    MuiChip: {
        root: {
            fontSize: 'inherit',
            backgroundColor: palette.common.white,
            borderRadius: '6.25em',
            border: `${spacing.borderWidth} solid ${palette.grey.light}`,
            color: palette.primary.main,
            height: '1.5em'
        },
        label: {
            paddingLeft: '0.75em',
            paddingRight: '0.75em'
        },
        icon: {
            marginLeft: '0.75em',
            marginRight: '-0.25em',
            color: palette.grey.main
        }
    }
}));
exports.default = () => styles_1.createStyles({
    innerLabel: {
        fontSize: '0.75em',
        fontWeight: 600
    }
});
//# sourceMappingURL=styles.js.map