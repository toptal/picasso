import { createStyles } from '@material-ui/core/styles';
import { PicassoProvider } from '../Picasso';
import { alpha } from '../styles';
PicassoProvider.override(({ palette, sizes: { input } }) => ({
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
                    borderColor: alpha(palette.grey.light, 0.48)
                },
                color: alpha(palette.common.black, 0.48)
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
                    color: alpha(palette.grey.main2, 0.48),
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
export default () => createStyles({
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