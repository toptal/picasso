"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette, screens, zIndex }) => styles_1.createStyles({
    root: {
        height: '100%',
        minWidth: '17em',
        width: '17em',
        boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
        padding: '1em 0',
        [screens('small')]: {
            width: '100vw',
            overflowY: 'scroll'
        }
    },
    responsiveWrapper: {
        position: 'absolute',
        top: '0.375em',
        left: '0.375em',
        zIndex: zIndex.appBar
    },
    paper: {
        [screens('small')]: {
            top: '2.5em !important'
        }
    },
    spacer: {
        order: 50,
        flex: 1,
        height: '100%'
    },
    light: {
        boxShadow: `inset -1px 0px 0px 0px ${palette.grey.lighter}`
    },
    dark: {
        boxShadow: `inset -1px 0px 0px 0px ${palette.grey.darker}`,
        backgroundColor: palette.grey.darker
    }
});
//# sourceMappingURL=styles.js.map