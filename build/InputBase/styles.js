import { PicassoProvider } from '../Picasso';
PicassoProvider.override(({ typography, palette }) => ({
    MuiInputBase: {
        root: {
            fontSize: 'unset'
        },
        input: {
            fontSize: typography.inputSize,
            lineHeight: '1.2em'
        },
        error: {
            color: palette.red.main,
            backgroundColor: palette.red.lighter
        }
    }
}));
//# sourceMappingURL=styles.js.map