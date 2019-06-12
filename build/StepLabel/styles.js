"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
const styles_2 = require("../styles");
Picasso_1.PicassoProvider.override(() => ({
    MuiStepLabel: {
        label: {
            display: 'flex',
            '&$active': {
                display: 'flex'
            }
        },
        iconContainer: {
            paddingRight: 0
        }
    }
}));
exports.default = ({ palette }) => styles_1.createStyles({
    hidden: {
        display: 'none'
    },
    root: {
        marginLeft: '0.5em'
    },
    label: {
        fontSize: styles_2.rem('11px'),
        fontWeight: 600,
        lineHeight: '1em',
        color: palette.grey.dark
    }
});
//# sourceMappingURL=styles.js.map