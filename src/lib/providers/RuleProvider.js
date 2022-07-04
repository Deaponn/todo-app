import RuleProvider from "diagram-js/lib/features/rules/RuleProvider";

import { isFrameElement } from "diagram-js/lib/util/Elements";

export default class MyRuleProvider extends RuleProvider {
    init = function () {
        this.addRule("shape.move", function (context) {
            var target = context.target,
                shape = context.shape;

            return target.parent === shape.target;
        });

        this.addRule("connection.create", function (context) {
            var source = context.source,
                target = context.target;

            return source.parent === target.parent;
        });

        this.addRule("connection.start", function (context) {
            return context.source.id.includes("shape") && !context.source.isFrame;
        });

        this.addRule("copyPaste.canCopyElements", function (context) {
            return true;
        });

        this.addRule("element.copy", function (context) {
            return true;
        });

        this.addRule("shape.resize", function (context) {
            var shape = context.shape;
            return isFrameElement(shape) || shape.id.includes("shape");
        });
    }
}
