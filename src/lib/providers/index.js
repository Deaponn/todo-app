import ContextPadProvider from "./ContextPadProvider";
import PaletteProvider from "./PaletteProvider";
import RuleProvider from "./RuleProvider";
import DescriptionProvider from "./DescriptionProvider";

const exports = {
    __init__: ["contextPadProvider", "paletteProvider", "ruleProvider", "descriptionProvider"],
    contextPadProvider: ["type", ContextPadProvider],
    paletteProvider: ["type", PaletteProvider],
    ruleProvider: ["type", RuleProvider],
    descriptionProvider: ["type", DescriptionProvider],
};

export default exports;
