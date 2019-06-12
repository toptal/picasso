"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.headerHeight = '4.5em';
exports.default = ({ palette, layout, zIndex }) => styles_1.createStyles({
    root: {
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: zIndex.appBar
    },
    light: {
        backgroundColor: palette.blue.dark
    },
    dark: {
        backgroundColor: palette.blue.darker
    },
    content: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        justifyContent: 'space-between',
        maxWidth: layout.contentWidth,
        height: exports.headerHeight,
        padding: `0 ${layout.contentPaddingHorizontal}`
    },
    fullWidth: {
        maxWidth: '100%'
    },
    left: {
        display: 'flex',
        alignItems: 'center'
    },
    right: {
        display: 'flex',
        alignItems: 'center'
    },
    divider: {
        width: '1px',
        height: '1.75em',
        backgroundColor: palette.common.white,
        opacity: 0.8
    }
});
//# sourceMappingURL=styles.js.map