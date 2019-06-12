import { Theme } from '@material-ui/core/styles';
import { Overrides } from '@material-ui/core/styles/overrides';
export declare class PicassoProvider {
    theme: Theme;
    constructor(theme: Theme);
    override(getOverride: (theme: Theme) => Partial<Overrides>): void;
    extendThemeOverrides(newOverride: Partial<Overrides>): void;
}
export default PicassoProvider;
