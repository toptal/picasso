var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '../../Container';
import Modal from '../../Modal';
import Button from '../../Button';
import Typography from '../../Typography';
import styles from './styles';
export const PromptModal = forwardRef(function PromptModal(props, ref) {
    const { children, title, message, variant, submitText, cancelText, onSubmit, onCancel } = props, rest = __rest(props, ["children", "title", "message", "variant", "submitText", "cancelText", "onSubmit", "onCancel"]);
    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleSubmit = () => {
        onSubmit(result, setLoading);
    };
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    React.createElement(Modal, Object.assign({ ref: ref }, rest),
        title && React.createElement(Modal.Title, null, title),
        React.createElement(Modal.Content, null,
            React.createElement(Typography, { size: 'medium' }, message),
            children && (React.createElement(Container, { top: 'xsmall' }, children({
                setResult,
                result,
                setLoading,
                loading,
                setError,
                error
            })))),
        React.createElement(Modal.Actions, null,
            React.createElement(Button, { disabled: loading, variant: 'flat', onClick: onCancel }, cancelText),
            React.createElement(Button, { disabled: error, loading: loading, onClick: handleSubmit, variant: `primary-${variant}` }, submitText))));
});
PromptModal.defaultProps = {
    cancelText: 'Cancel',
    onCancel: () => { },
    size: 'small',
    submitText: 'Submit',
    variant: 'green'
};
PromptModal.displayName = 'PromptModal';
export default withStyles(styles)(PromptModal);
//# sourceMappingURL=PromptModal.js.map