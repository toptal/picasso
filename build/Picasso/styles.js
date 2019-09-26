import { createStyles } from '@material-ui/core';
export default ({ typography }) => createStyles({
    root: {
        flex: 1,
        boxSizing: 'border-box',
        '& *': {
            fontFamily: typography.fontFamily
        },
        // https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
        '& *, & *::before, & *::after': {
            boxSizing: 'inherit'
        }
    }
});
//# sourceMappingURL=styles.js.map