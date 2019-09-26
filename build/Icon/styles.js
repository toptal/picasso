import { createStyles } from '@material-ui/core';
export default ({ palette }) => createStyles({
    root: {
        fill: 'currentColor',
        display: 'inline-block',
        fontSize: 'inherit',
        height: '1em',
        verticalAlign: '-.125em'
    },
    // colors
    green: {
        color: palette.green.main
    },
    red: {
        color: palette.red.main
    },
    blue: {
        color: palette.primary.main
    },
    yellow: {
        color: palette.yellow.main
    },
    lightGrey: {
        color: palette.grey.light
    },
    grey: {
        color: palette.grey.main
    },
    darkGrey: {
        color: palette.text.primary
    },
    black: {
        color: palette.common.black
    },
    invert: {
        color: palette.common.white
    },
    inherit: {
        color: 'inherit'
    }
});
//# sourceMappingURL=styles.js.map