"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Picasso_1 = require("../Picasso");
Picasso_1.PicassoProvider.override(() => ({
    MuiSnackbarContent: {
        message: {
            display: 'flex',
            padding: 0,
            maxWidth: '72.5em'
        }
    }
}));
exports.default = ({ palette: { red, green, yellow, common, text }, shadows }) => styles_1.createStyles({
    notification: {
        alignItems: 'start',
        borderRadius: 0,
        flexWrap: 'nowrap',
        maxWidth: 'initial',
        padding: '1.5em',
        position: 'relative',
        width: '100%',
        boxShadow: 'none'
    },
    notificationShadow: {
        boxShadow: shadows[3]
    },
    notificationRed: {
        background: red.lighter
    },
    notificationGreen: {
        background: green.lighter
    },
    notificationWhite: {
        background: common.white
    },
    notificationYellow: {
        background: yellow.lighter
    },
    notificationFullWidth: {
        justifyContent: 'center'
    },
    // Content
    content: {
        color: text.primary
    },
    contentCloseButton: {
        paddingRight: '1.5em'
    },
    // Content Icon
    iconWrapper: {
        flexBasis: '1.5em',
        marginRight: '1.5em',
        minWidth: '1.5em',
        height: '1.3125em'
    },
    close: {
        position: 'absolute',
        right: '.75em',
        top: '.75em',
        background: 'transparent',
        border: 0,
        padding: 0,
        '&:hover': {
            background: 'transparent'
        }
    },
    closeIcon: {
        fill: text.primary
    }
});
//# sourceMappingURL=styles.js.map