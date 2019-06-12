"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
require("../FormControl/styles");
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
exports.default = ({ spacing: { input, inputIcon }, palette }) => styles_1.createStyles({
    root: {
        height: input.height,
        width: input.width
    },
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
        fontSize: '1em',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: '100%',
        padding: input.padding,
        paddingRight: `calc(${input.padding} + 1em)`,
        border: 'none'
    },
    inputNative: {
        fontSize: '0.8125em',
        padding: 0,
        paddingRight: 0
    },
    inputPlaceholder: {
        color: palette.grey.dark
    },
    inputPlaceholderDisabled: {
        color: styles_2.alpha(palette.grey.dark, 0.48)
    },
    inputValue: {
        fontSize: '0.8125em'
    },
    select: {
        width: '100%'
    },
    selectNative: {
        padding: input.padding,
        paddingRight: `calc(${input.padding} + 1em)`
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
    icon: {
        color: palette.grey.dark,
        fontSize: '1em',
        minWidth: inputIcon.width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    iconStart: {
        marginRight: '0.5em'
    },
    iconEnd: {
        marginLeft: '0.5em',
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    iconDisabled: {
        color: styles_2.alpha(palette.grey.dark, 0.48)
    }
});
//# sourceMappingURL=styles.js.map