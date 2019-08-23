"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../../styles");
const Picasso_1 = require("../../Picasso");
Picasso_1.PicassoProvider.override(() => ({
    MuiSlider: {
        thumb: {
            '&:hover, &$active, &$focusVisible': {
                boxShadow: 'none'
            }
        }
    }
}));
exports.default = ({ palette }) => styles_1.createStyles({
    root: {
        display: 'block',
        color: palette.grey.main,
        margin: `${styles_2.rem('6px')} 0`,
        padding: 0,
        height: styles_2.rem('1px')
    },
    rail: {
        height: styles_2.rem('1px'),
        borderRadius: 'unset',
        opacity: 0.24
    },
    track: {
        backgroundColor: palette.grey.main,
        borderRadius: 'unset',
        height: styles_2.rem('1px')
    },
    thumb: {
        backgroundColor: palette.primary.main,
        border: `${styles_2.rem('2px')} solid ${palette.common.white}`,
        height: styles_2.rem('13px'),
        width: styles_2.rem('13px'),
        marginTop: styles_2.rem('-6px')
    }
});
//# sourceMappingURL=styles.js.map