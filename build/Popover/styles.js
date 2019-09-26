import { PicassoProvider } from '../Picasso';
PicassoProvider.override(({ screens }) => ({
    MuiPopover: {
        paper: {
            [screens('small')]: {
                width: '100vw',
                maxWidth: '100vw',
                left: '0 !important',
                // screen height - header height
                maxHeight: 'calc(100vh - 2.5em)',
                padding: 0
            }
        }
    }
}));
//# sourceMappingURL=styles.js.map