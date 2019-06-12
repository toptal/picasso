"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../PageHeader/styles");
exports.default = ({ layout }) => styles_1.createStyles({
    root: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: styles_2.headerHeight
    },
    content: {
        height: '100%',
        flexGrow: 1,
        maxWidth: layout.contentWidth,
        padding: '0 1rem'
    },
    fullWidth: {
        maxWidth: '100%'
    }
});
//# sourceMappingURL=styles.js.map