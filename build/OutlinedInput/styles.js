"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
const styles_2 = require("../styles");
const TAG_SELECTOR_GUTTER_SIZE = styles_2.rem('6px');
Picasso_1.PicassoProvider.override(({ palette, sizes: { input } }) => ({
    MuiOutlinedInput: {
        root: {
            height: input.height,
            width: input.width,
            color: palette.common.black,
            '& $notchedOutline': {
                borderColor: palette.grey.light,
                borderRadius: 0,
                top: 0,
                '& legend': {
                    height: 0
                }
            },
            '&$focused': {
                '& $notchedOutline': {
                    borderWidth: '1px'
                }
            },
            '&$disabled': {
                '& $notchedOutline': {
                    borderColor: styles_2.alpha(palette.grey.light, 0.48)
                },
                color: styles_2.alpha(palette.common.black, 0.48)
            },
            '&:hover': {
                '&:not($disabled)&:not($focused)&:not($error)': {
                    '& $notchedOutline': {
                        borderColor: palette.primary.main
                    }
                }
            }
        },
        input: {
            fontSize: '1em',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
            height: '100%',
            padding: input.padding,
            border: 'none',
            '&::placeholder': {
                color: palette.grey.main2,
                opacity: 1
            },
            '&$disabled': {
                '&::placeholder': {
                    color: styles_2.alpha(palette.grey.main2, 0.48),
                    opacity: 1
                }
            }
        },
        inputMultiline: {
            padding: 0
        },
        multiline: {
            padding: 0
        },
        error: {
            backgroundColor: palette.common.white
        },
        notchedOutline: {}
    }
}));
exports.default = ({ sizes: { input } }) => styles_1.createStyles({
    root: {},
    rootFull: {
        width: '100%'
    },
    rootShrink: {
        width: 'auto'
    },
    rootAuto: {},
    rootVariantTagSelector: {
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
        // Loading indicator
        '& > div:last-child': {
            marginRight: input.padding
        }
    },
    input: {},
    inputVariantTagSelector: {
        width: 'auto',
        height: styles_2.rem('24px'),
        paddingLeft: styles_2.rem('4px'),
        paddingRight: '0',
        fontSize: '0.8125em'
    },
    inputMultiline: {}
});
//# sourceMappingURL=styles.js.map