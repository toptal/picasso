"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
exports.default = ({ screens }) => styles_1.createStyles({
    avatar: {
        fontSize: '0.9rem'
    },
    contentUserBadge: {
        [screens('small')]: {
            padding: '1em',
            zIndex: 1,
            backgroundColor: 'white',
            position: 'relative'
        }
    },
    xsmall: {
        [screens('small')]: {
            height: '1.5em',
            width: '1.5em'
        }
    },
    content: {
        width: '15em',
        [screens('small')]: {
            width: '100vw'
        }
    },
    name: {
        fontWeight: 400,
        display: 'block'
    },
    truncateText: {
        maxWidth: '11.5rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    arrow: {
        color: 'white',
        [screens('small')]: {
            marginLeft: '0.5rem'
        }
    },
    paper: {
        [screens('small')]: {
            top: '2.5em !important'
        }
    }
});
//# sourceMappingURL=styles.js.map