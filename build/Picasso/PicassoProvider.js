export class PicassoProvider {
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
export default PicassoProvider;
//# sourceMappingURL=PicassoProvider.js.map