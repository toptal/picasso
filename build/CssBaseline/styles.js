"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    '@global': {
        html: {
            boxSizing: 'initial',
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale'
        },
        '*, *::before, *::after': {
            boxSizing: 'inherit'
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            margin: 0,
            backgroundColor: palette.common.white
        },
        '@media print': {
            body: {
                backgroundColor: palette.common.white
            }
        },
        '#root': {
            display: 'flex',
            flex: 1
        }
    }
});
//# sourceMappingURL=styles.js.map