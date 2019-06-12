"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    accountItem: {
        height: 'auto',
        '&+&': {
            borderTop: `1px solid ${palette.grey.light}`
        }
    },
    accountLink: {
        flex: 1
    }
});
//# sourceMappingURL=styles.js.map