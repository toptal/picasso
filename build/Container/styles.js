"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
const styles_2 = require("../styles");
const spacingVariants = Object.keys(Picasso_1.SpacingEnum).filter(variant => Number.isNaN(Number(variant)));
const paddings = spacingVariants.reduce((acc, variant) => {
    acc[`${variant}Padding`] = {
        padding: Picasso_1.spacingToEm(variant)
    };
    return acc;
}, Object.create(null));
const colorVariant = (colorOptions) => {
    if (!colorOptions) {
        return {};
    }
    return styles_2.createPropertiesStyles({
        backgroundColor: colorOptions.lighter,
        '&$bordered': {
            borderColor: colorOptions.main
        }
    });
};
exports.default = ({ palette }) => styles_1.createStyles(Object.assign({ bordered: {
        border: `1px solid ${palette.grey.lighter}`
    }, flex: {
        display: 'flex',
        '&$inline': {
            display: 'inline-flex'
        }
    }, column: {
        flexDirection: 'column'
    }, inline: {
        display: 'inline-block'
    }, whiteVariant: colorVariant(), redVariant: colorVariant(palette.red), greenVariant: colorVariant(palette.green), yellowVariant: colorVariant(palette.yellow), blueVariant: colorVariant(palette.blue) }, paddings));
//# sourceMappingURL=styles.js.map