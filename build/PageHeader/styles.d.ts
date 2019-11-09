import { Theme } from '@material-ui/core/styles';
export declare const headerHeight: {
    default: string;
    smallAndMedium: string;
};
declare const _default: ({ palette, layout, zIndex, screens }: Theme) => Record<"content" | "left" | "right" | "dark" | "light" | "root" | "fullWidth" | "divider" | "logoContainer" | "logo", import("@material-ui/styles").CSSProperties | (() => import("@material-ui/styles").CSSProperties)>;
export default _default;
