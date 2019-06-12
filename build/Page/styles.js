"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = () => styles_1.createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '& > footer, & > header': {
            flex: 0
        }
    }
});
//# sourceMappingURL=styles.js.map