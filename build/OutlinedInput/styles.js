"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
const styles_2 = require("../styles");
Picasso_1.PicassoProvider.override(({ palette, spacing: { input } }) => ({
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
exports.default = () => styles_1.createStyles({
    root: {},
    rootFull: {
        width: '100%'
    },
    rootShrink: {
        width: 'auto'
    },
    rootAuto: {},
    input: {},
    inputMultiline: {}
});
//# sourceMappingURL=styles.js.map