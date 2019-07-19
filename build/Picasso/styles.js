"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
exports.default = ({ typography }) => core_1.createStyles({
    root: {
        flex: 1,
        boxSizing: 'border-box',
        '& *': {
            fontFamily: typography.fontFamily
        },
        // https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
        '& *, & *::before, & *::after': {
            boxSizing: 'inherit'
        }
    }
});
//# sourceMappingURL=styles.js.map