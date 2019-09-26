import { PicassoProvider } from '../Picasso';
PicassoProvider.override(({ palette, sizes }) => ({
    MuiChip: {
        root: {
            fontSize: '1em',
            color: palette.grey.dark,
            backgroundColor: palette.common.white,
            borderRadius: '6.25em',
            border: `${sizes.borderWidth} solid ${palette.grey.light}`,
            height: '1.5em'
        },
        label: {
            paddingLeft: '0.75em',
            paddingRight: '0.75em'
        },
        icon: {
            marginLeft: '0.75em',
            marginRight: '-0.25em',
            color: 'inherit'
        },
        deletable: {
            '&:focus': {
                backgroundColor: 'inherit'
            }
        },
        deleteIcon: {
            display: 'flex',
            justifyContent: 'center',
            color: 'inherit',
            margin: '0 0.5em 0 -0.5em',
            '&:hover': {
                color: 'inherit'
            }
        }
    }
}));
//# sourceMappingURL=styles.js.map