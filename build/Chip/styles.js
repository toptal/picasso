"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(({ palette, spacing }) => ({
    MuiChip: {
        root: {
            fontSize: '1em',
            color: palette.grey.dark,
            backgroundColor: palette.common.white,
            borderRadius: '6.25em',
            border: `${spacing.borderWidth} solid ${palette.grey.light}`,
            height: '1.5em'
        },
        label: {
            paddingLeft: '0.75em',
            paddingRight: '0.75em'
        },
        icon: {
            marginLeft: '0.75em',
            marginRight: '-0.25em',
            color: 'inherit'
        },
        deletable: {
            '&:focus': {
                backgroundColor: 'inherit'
            }
        },
        deleteIcon: {
            display: 'flex',
            justifyContent: 'center',
            color: 'inherit',
            margin: '0 0.5em 0 -0.5em',
            '&:hover': {
                color: 'inherit'
            }
        }
    }
}));
exports.default = () => styles_1.createStyles({
    root: {},
    icon: {},
    deleteIcon: {},
    innerLabel: {
        fontSize: '0.75em',
        fontWeight: 600
    }
});
//# sourceMappingURL=styles.js.map