"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("../styles");
exports.default = ({ palette, typography }) => {
    const separatorStyles = styles_1.createPropertiesStyles({
        display: 'block',
        left: 0,
        right: 0,
        height: '1px',
        content: '""',
        opacity: 1,
        backgroundColor: palette.grey.light,
        position: 'absolute'
    });
    return {
        root: {
            '&:first-child:before, &:before': Object.assign({}, separatorStyles),
            '&$expanded + &:before': {
                display: 'block'
            },
            '&:after': Object.assign({}, separatorStyles)
        },
        expanded: {
            margin: 0
        },
        defaultSummary: {
            color: palette.common.black
        },
        defaultDetails: {
            color: palette.text.primary
        },
        controlledDetails: {
            marginTop: '0.75em',
            marginBottom: '0.75em'
        },
        expandIcon: {
            fontSize: '0.7em',
            color: palette.primary.main
        },
        detailsContent: {
            padding: 0,
            lineHeight: '1.5em',
            color: palette.grey.darker,
            fontSize: '0.875em',
            fontWeight: typography.fontWeights.regular
        }
    };
};
//# sourceMappingURL=styles.js.map