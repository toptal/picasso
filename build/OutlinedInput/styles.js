"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Picasso_1 = require("../Picasso");
const styles_1 = require("../styles");
Picasso_1.PicassoProvider.override(({ palette }) => ({
    MuiOutlinedInput: {
        root: {
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
                    borderColor: styles_1.alpha(palette.grey.light, 0.48)
                },
                color: styles_1.alpha(palette.common.black, 0.48)
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
            border: 'solid 1px transparent',
            '&::placeholder': {
                color: palette.grey.dark,
                opacity: 1
            },
            '&$disabled': {
                '&::placeholder': {
                    color: styles_1.alpha(palette.grey.dark, 0.48),
                    opacity: 1
                }
            }
        },
        multiline: {
            padding: 0
        },
        error: {
            backgroundColor: palette.common.white
        },
        notchedOutline: {},
        adornedStart: {
            paddingRight: 0,
            color: palette.grey.dark
        },
        adornedEnd: {
            paddingRight: 0,
            color: palette.grey.dark
        }
    }
}));
exports.default = {
    root: {},
    input: {}
};
//# sourceMappingURL=styles.js.map