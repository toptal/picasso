"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../../styles");
exports.default = ({ palette }) => styles_1.createStyles({
    track: {
        backgroundColor: palette.grey.main,
        height: styles_2.rem('1px')
    },
    thumb: {
        border: `${styles_2.rem('2px')} solid ${palette.common.white}`,
        height: styles_2.rem('13px'),
        width: styles_2.rem('13px'),
        '&:hover': {
            boxShadow: 'none'
        }
    },
    activated: {
        '& $thumb': {
            boxShadow: 'none'
        }
    }
});
//# sourceMappingURL=styles.js.map