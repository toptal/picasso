import { createStyles } from '@material-ui/core/styles';
const getClipPathCornerMask = (cornerWidth) => `polygon(0 0, 100% 0, 100% 100%, ${cornerWidth} 100%, 0 calc(100% - ${cornerWidth}))`;
const CLIPPED_CORNER_SIZE_EM = 0.5;
const LOGO_SIZE_EM = 0.5;
export default ({ palette }) => createStyles({
    root: {
        position: 'relative'
    },
    image: {
        objectFit: 'cover'
    },
    square: {
        width: '2.5em',
        height: '2.5em'
    },
    portrait: {
        width: '1.666em',
        height: '2.5em'
    },
    landscape: {
        width: '2.5em',
        height: '1.666em'
    },
    xsmall: {
        fontSize: '1rem'
    },
    small: {
        fontSize: '2rem'
    },
    medium: {
        fontSize: '3rem'
    },
    large: {
        fontSize: '4rem'
    },
    clippedCorner: {
        clipPath: getClipPathCornerMask(`${CLIPPED_CORNER_SIZE_EM}em`),
        // we can remove this prefix as soon as this issue will
        // be resolved - https://github.com/cssinjs/css-vendor/issues/74
        '-webkit-clip-path': getClipPathCornerMask(`${CLIPPED_CORNER_SIZE_EM}em`)
    },
    textContainer: {
        backgroundColor: palette.grey.main
    },
    text: {
        fontSize: '1em',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textTransform: 'uppercase'
    },
    logoContainer: {
        display: 'flex',
        position: 'absolute',
        bottom: `${CLIPPED_CORNER_SIZE_EM * 0.8}em`,
        left: `${CLIPPED_CORNER_SIZE_EM * 0.8}em`
    },
    logo: {
        fontSize: `${LOGO_SIZE_EM}em`
    }
});
//# sourceMappingURL=styles.js.map