"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const picasso_1 = require("@toptal/picasso");
const react_router_dom_1 = require("react-router-dom");
const Index = () => {
    return react_1.default.createElement("h2", null, "Home");
};
const About = () => {
    return react_1.default.createElement("h2", null, "About");
};
const Users = () => {
    return react_1.default.createElement("h2", null, "Users");
};
const RoutingExample = () => (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement("div", null,
        react_1.default.createElement("nav", null,
            react_1.default.createElement("ul", null,
                react_1.default.createElement("li", null,
                    react_1.default.createElement(picasso_1.Link, { as: react_router_dom_1.Link, to: '/' }, "Home")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement(picasso_1.Link, { as: react_router_dom_1.Link, to: '/about/' }, "About")),
                react_1.default.createElement("li", null,
                    react_1.default.createElement(picasso_1.Link, { as: react_router_dom_1.Link, to: '/users/' }, "Users")))),
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: '/', exact: true, component: Index }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/about/', component: About }),
            react_1.default.createElement(react_router_dom_1.Route, { path: '/users/', component: Users }),
            react_1.default.createElement(react_router_dom_1.Route, { component: Index })))));
exports.default = RoutingExample;
//# sourceMappingURL=Routing.example.js.map