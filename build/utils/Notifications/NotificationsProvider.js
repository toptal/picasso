"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const notistack_1 = require("notistack");
const Picasso_1 = require("../../Picasso");
const styles_1 = require("../../PageHeader/styles");
const MAX_NOTIFICATION_MESSAGES = 5;
const NotificationsProvider = ({ children }) => {
    const { hasPageHeader } = Picasso_1.usePageHeader();
    return (react_1.default.createElement(notistack_1.SnackbarProvider, { maxSnack: MAX_NOTIFICATION_MESSAGES, style: hasPageHeader ? { marginTop: styles_1.headerHeight } : undefined }, children));
};
exports.default = NotificationsProvider;
//# sourceMappingURL=NotificationsProvider.js.map