"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = () => styles_1.createStyles({
    '@global': {
        html: {
            boxSizing: 'initial'
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
        },
        '#root': {
            display: 'flex',
            flex: 1
        }
    }
});
//# sourceMappingURL=styles.js.map