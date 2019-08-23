"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
const styles_2 = require("../styles");
Picasso_1.PicassoProvider.override(({ palette, transitions }) => ({
    MuiRadio: {
        root: {
            color: palette.common.white,
            fontSize: '1rem',
            position: 'relative',
            width: '1em',
            height: '1em',
            padding: '0',
            margin: '0.25em 0.5em 0.25em 0',
            transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
            '&$disabled': {
                opacity: 0.48,
                cursor: 'not-allowed',
                pointerEvents: 'auto'
            }
        },
        checked: {
            color: palette.primary.main
        }
    }
}));
const centeredCircle = (backgroundColor) => styles_2.createPropertiesStyles({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '50%',
    left: '50%',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    content: '""',
    borderColor: 'inherit',
    background: backgroundColor,
    pointerEvents: 'none',
    transition: 'border-color',
    transitionDuration: 'inherit',
    transitionTimingFunction: 'inherit'
});
exports.default = ({ palette, sizes, transitions }) => styles_1.createStyles({
    root: {
        '&:hover $uncheckedIcon': {
            color: palette.primary.main
        }
    },
    disabled: {
        '&:hover $uncheckedIcon': {
            color: palette.grey.main
        }
    },
    uncheckedIcon: {
        color: palette.grey.main,
        transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
        '&:before': Object.assign({}, centeredCircle(palette.common.white), { border: `${sizes.borderWidth} solid ${palette.grey.main}` }),
        '&:after': Object.assign({}, centeredCircle(palette.common.white), { width: 'initial', height: 'initial', borderWidth: styles_2.rem('3px'), borderStyle: 'solid', opacity: 0, color: palette.common.white, transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}` })
    },
    checkedIcon: {
        color: palette.primary.main,
        transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
        '&:before': Object.assign({}, centeredCircle(palette.common.white), { border: `${sizes.borderWidth} solid ${palette.grey.main}` }),
        '&:after': Object.assign({}, centeredCircle(palette.common.white), { width: 'initial', height: 'initial', borderWidth: styles_2.rem('3px'), borderStyle: 'solid', opacity: 1, transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}` })
    },
    label: {
        marginRight: '0.5em'
    }
});
//# sourceMappingURL=styles.js.map