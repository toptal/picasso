"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({
    MuiStepIcon: {
        text: {
            display: 'none'
        }
    }
}));
exports.default = ({ palette, spacing }) => styles_1.createStyles({
    root: {
        height: '1.5em',
        width: '1.5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `${spacing.borderWidth} solid ${palette.grey.main}`,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        color: palette.common.white
    },
    active: {
        border: 'none',
        backgroundColor: palette.blue.main
    },
    completed: {
        border: 'none',
        backgroundColor: palette.green.main
    }
});
//# sourceMappingURL=styles.js.map