"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
const spacingVariants = Object.keys(Picasso_1.SpacingEnum).filter(variant => Number.isNaN(Number(variant)));
const paddings = spacingVariants.reduce((acc, variant) => {
    acc[`${variant}Padding`] = {
        padding: Picasso_1.spacingToEm(variant)
    };
    return acc;
}, Object.create(null));
exports.default = ({ palette }) => styles_1.createStyles(Object.assign({ bordered: {
        border: `1px solid ${palette.grey.lighter}`
    }, flex: {
        display: 'flex',
        '&$inline': {
            display: 'inline-flex'
        }
    }, inline: {
        display: 'inline-block'
    } }, paddings));
//# sourceMappingURL=styles.js.map