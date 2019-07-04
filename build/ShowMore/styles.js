"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ palette }) => styles_1.createStyles({
    toggleText: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.5em'
    },
    icon: {
        fontSize: '0.6em',
        marginLeft: '1em',
        color: palette.primary.main,
        transform: 'rotate(90deg)'
    },
    expandedIcon: {
        transform: 'rotate(-90deg)'
    }
});
//# sourceMappingURL=styles.js.map