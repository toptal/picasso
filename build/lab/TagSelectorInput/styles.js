"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const styles_2 = require("../../styles");
const TAG_SELECTOR_GUTTER_SIZE = styles_2.rem('6px');
exports.default = ({ sizes: { input } }) => styles_1.createStyles({
    inputBase: {
        display: 'flex',
        flexWrap: 'wrap',
        height: 'auto',
        padding: TAG_SELECTOR_GUTTER_SIZE,
        marginRight: `-${TAG_SELECTOR_GUTTER_SIZE}`,
        marginBottom: `-${TAG_SELECTOR_GUTTER_SIZE}`,
        '& > *': {
            marginRight: TAG_SELECTOR_GUTTER_SIZE,
            marginBottom: TAG_SELECTOR_GUTTER_SIZE
        },
        '& > input': {
            width: 'auto',
            height: styles_2.rem('24px'),
            paddingLeft: styles_2.rem('4px'),
            paddingRight: '0',
            fontSize: '0.8125em'
        }
    },
    loaderAdornment: {
        marginRight: input.padding
    }
});
//# sourceMappingURL=styles.js.map