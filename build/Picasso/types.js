"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpacingEnum;
(function (SpacingEnum) {
    SpacingEnum[SpacingEnum["xsmall"] = 0.5] = "xsmall";
    SpacingEnum[SpacingEnum["small"] = 1] = "small";
    SpacingEnum[SpacingEnum["medium"] = 1.5] = "medium";
    SpacingEnum[SpacingEnum["large"] = 2] = "large";
    SpacingEnum[SpacingEnum["xlarge"] = 2.5] = "xlarge";
})(SpacingEnum || (SpacingEnum = {}));
exports.spacingToEm = (spacing) => typeof spacing === 'number' ? `${spacing}em` : `${SpacingEnum[spacing]}em`;
//# sourceMappingURL=types.js.map