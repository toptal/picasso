"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../styles");
exports.default = ({ palette }) => styles_1.createStyles({
    root: {
        color: palette.grey[400],
        display: 'block',
        marginBottom: '0.5em',
        lineHeight: '1em'
    },
    disabled: {
        color: styles_2.alpha(palette.grey[400], 0.48)
    },
    text: {
        fontSize: '0.875em'
    },
    asterisk: {
        marginRight: '0.3125em',
        color: palette.error.main,
        fontSize: '0.875em'
    },
    inline: {
        display: 'inline-block',
        marginBottom: 0,
        '& $text': {
            fontSize: '0.8125em',
            verticalAlign: 'top'
        },
        '& $asterisk': {
            fontSize: '0.8125em',
            verticalAlign: 'top'
        }
    }
});
//# sourceMappingURL=styles.js.map