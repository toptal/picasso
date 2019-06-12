"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PicassoProvider {
    constructor(theme) {
        this.theme = theme;
    }
    override(getOverride) {
        const newOverride = getOverride(this.theme);
        this.extendThemeOverrides(newOverride);
    }
    extendThemeOverrides(newOverride) {
        const overrides = this.theme.overrides || {};
        Object.assign(overrides, newOverride);
        this.theme.overrides = overrides;
    }
}
exports.PicassoProvider = PicassoProvider;
exports.default = PicassoProvider;
//# sourceMappingURL=PicassoProvider.js.map