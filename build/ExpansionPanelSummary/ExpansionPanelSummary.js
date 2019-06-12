"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const ExpansionPanelSummary_1 = __importDefault(require("@material-ui/core/ExpansionPanelSummary"));
const styles_2 = __importDefault(require("./styles"));
// We can't create here intermediate object for ExpansionPanelSummary
// because MUI ExpansionPanel use type check to set Summary in the
// correct place of the markdown
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ExpansionPanel/ExpansionPanel.js#L144
exports.default = styles_1.withStyles(styles_2.default)(ExpansionPanelSummary_1.default);
//# sourceMappingURL=ExpansionPanelSummary.js.map