"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
require("../InputLabel/styles");
require("../InputBase/styles");
require("../OutlinedInput/styles");
require("../Menu/styles");
require("../MenuItem/styles");
const styles_2 = require("../styles");
Picasso_1.PicassoProvider.override(() => ({
    MuiSelect: {
        select: {
            '&:focus': {
                backgroundColor: 'transparent'
            }
        },
        selectMenu: {
            minHeight: 'auto',
            lineHeight: '1em'
        }
    }
}));
exports.default = ({ sizes: { input }, palette }) => styles_1.createStyles({
    rootFull: {
        width: '100%',
        display: 'flex'
    },
    rootShrink: {
        width: 'auto',
        '& $input': {
            paddingRight: `calc(${input.padding} + 1em)`
        }
    },
    rootAuto: {},
    input: {
        paddingRight: `calc(${input.padding} + 1em)`
    },
    inputRootNative: {
        paddingLeft: input.padding,
        paddingRight: `calc(${input.padding} + 1em)`
    },
    inputNative: {
        fontSize: '0.8125em',
        padding: 0,
        paddingRight: 0
    },
    inputPlaceholder: {
        color: palette.grey.main2
    },
    inputPlaceholderDisabled: {
        color: styles_2.alpha(palette.grey.main2, 0.48)
    },
    inputValue: {
        fontSize: '0.8125em'
    },
    select: {
        width: '100%'
    },
    caret: {
        top: 'calc(50% - 0.5em)',
        // in specs right spacing is defined relative to 6px icon width, while we use 16px
        // so 5px are left instead of 10px when we use wider icon.
        right: '0.3125em',
        color: palette.grey.dark,
        fontSize: '1em'
    },
    caretDisabled: {
        color: styles_2.alpha(palette.grey.dark, 0.48)
    },
    placeholder: {
        opacity: 0.4
    },
    placeholderOption: {
        '&[data-value=""]': {
            backgroundColor: 'initial',
            color: 'initial',
            '&:hover, &:focus': {
                backgroundColor: 'initial',
                color: 'initial'
            }
        }
    }
});
//# sourceMappingURL=styles.js.map